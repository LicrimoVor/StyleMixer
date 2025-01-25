from typing import Literal
from pathlib import Path
from time import sleep

import numpy as np
import torch
from torch.utils.data import DataLoader
from tqdm import tqdm
import matplotlib.pyplot as plt

from models.libs.save_model import save_model
from models.libs.loss import StyleLoss
from models.net import StyleNet

from ..models.libs.create_path import create_path
from .save_picture import save_picture
from .dataset import StyleDataset


plt.style.use("fivethirtyeight")


class StyleTrainer:
    """Тренер для style-net"""

    LOG_TEMPLATE = "Epoch {ep:03d}, Loss - {loss:0.6f};"
    SAVE_TEMPLATE = "\nModels have {params} params\nEpoch_count: {epoch_count}"

    def __init__(
        self,
        model: StyleNet,
        loss_f: StyleLoss,
        optimizer: torch.optim.Optimizer,
        epoch_count: int = 10,
        device: Literal["cpu", "cuda"] = "cpu",
        scheduler: torch.optim.lr_scheduler.LRScheduler = None,
        save: bool = True,
    ):
        self.device = torch.device(device)
        self.loss_f = loss_f
        self.optimizer = optimizer
        self.epoch_count = epoch_count
        self.scheduler = scheduler

        self.model = model.to(self.device)
        self.is_save = save
        self.save_path = create_path(name="StyleNet")

        self.train_loss = []
        self.val_loss = []

    def fit(self, train_loader: DataLoader[StyleDataset]):
        """Одна эпоха обучения модели."""
        self.model.train()
        losses = []

        for contents, styles in tqdm(train_loader):
            contents, styles = contents.to(self.device), styles.to(self.device)
            self.model.zero_grad()
            response = self.model(contents, styles, out_features=True)
            loss = self.loss_f(response)
            loss.backward()
            self.optimizer.step()
            losses.append(loss)

        return np.mean(losses)

    def train(self, train_loader: DataLoader[StyleDataset], step_save: int = 5):
        self.history = []
        predicts = []
        imgs = []

        try:
            for epoch in range(1, self.epoch_count + 1):
                print(f"Epoch: {epoch}")
                loss = self.fit(train_loader)

                if self.scheduler is not None:
                    self.scheduler.step()

                self.history.append(loss)
                print(
                    self.LOG_TEMPLATE.format(ep=epoch, loss=loss),
                    "\n" + "-" * 56,
                )
                if epoch % step_save == 0:
                    save_picture(imgs, predicts, self.save_path.joinpath(f"imgs_{epoch}.png"))
                    imgs = []
                    predicts = []
        except KeyboardInterrupt:
            print("Предварительное окончание")
        finally:
            if not self.is_save:
                return self.history

            save_model(self.model, self.save_path)

            # with open(self.save_path.joinpath("record.txt"), "+w") as file:
            #     file.write(
            #         self.LOG_TEMPLATE.format(
            #             ep=epoch,
            #             t_loss_gen=t_loss_gen,
            #             v_loss_gen=v_loss_gen,
            #             t_loss_desc=t_loss_desc,
            #             v_loss_desc=v_loss_desc,
            #         ),
            #     )
            #     file.write(
            #         self.SAVE_TEMPLATE.format(
            #             params=self.model.get_count_params(),
            #             epoch_count=self.epoch_count,
            #         )
            #     )

            self.save_history(self.history, self.save_path)
            print("SAVED")

        return self.history

    def save_history(self, history: dict[str, list], path: Path):
        plt.clf()
        sleep(5)

        plt.plot(history["generator"], label="train loss generator")
        plt.plot(history["discriminator"], label="train loss discriminator")

        plt.legend(loc="best")
        plt.xlabel("epochs")
        plt.ylabel("loss")
        plt.savefig(path.joinpath("record.png"))
