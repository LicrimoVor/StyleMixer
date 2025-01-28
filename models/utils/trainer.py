from typing import Literal
from time import sleep

import torch
from torch.utils.data import DataLoader
from tqdm import tqdm
import matplotlib.pyplot as plt

from models.libs.save_model import save_model
from models.libs.create_path import create_path
from models.libs.loss import StyleLoss
from models.net import StyleNet

from .save_picture import save_picture
from .dataset import StyleDataset


plt.style.use("fivethirtyeight")


class StyleTrainer:
    """Тренер для style-net"""

    LOG_TEMPLATE = (
        "\nLoss content - {loss_c:0.6f};"
        + "\nLoss style - {loss_s:0.6f};"
        + "\nLoss total - {loss_t:0.6f};"
    )
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

        self.model = model
        self.is_save = save
        self.save_path = create_path(name="StyleNet")

    def fit(
        self,
        train_loader: DataLoader[StyleDataset],
        step_iter: int = 1000,
        epoch: int = 5,
    ):
        """Одна эпоха обучения модели."""
        self.model.train()
        losses_hist = {"x": [], "content": [], "style": [], "total": []}
        losses = {"content": 0, "style": 0, "total": 0}
        count_iter = 0

        for contents, styles in (terminal := tqdm(train_loader(), total=train_loader.length)):
            contents, styles = contents.to(self.device), styles.to(self.device)
            response = self.model(contents, styles, out_features=True)
            loss_c, loss_s, loss_t = self.loss_f(response, all_loss=True)

            self.optimizer.zero_grad()
            loss_t.backward()
            self.optimizer.step()
            loss_c, loss_s, loss_t = loss_c.cpu().item(), loss_s.cpu().item(), loss_t.cpu().item()

            losses["content"] += loss_c
            losses["style"] += loss_s
            losses["total"] += loss_t
            terminal.set_postfix(
                {
                    "loss content": f"{loss_c:.4f}",
                    "loss style": f"{loss_s:.4f}",
                    "loss total": f"{loss_t:.4f}",
                }
            )
            count_iter += 1
            if count_iter % step_iter == 0:
                save_picture(
                    contents.cpu(),
                    styles.cpu(),
                    response["out"].cpu(),
                    path=self.save_path.joinpath(f"img_{epoch}_{count_iter}.png"),
                )
                for key, value in losses.items():
                    losses_hist[key].append(value / step_iter)
                    losses[key] = 0
                losses_hist["x"].append(count_iter / train_loader.length + epoch)

        return losses_hist

    def train(
        self,
        train_loader: DataLoader[StyleDataset],
        step_epoch: int = 5,
        step_iter: int = 1000,
    ):
        """Полноценное обучение"""
        self.history = {"x": [], "content": [], "style": [], "total": []}
        try:
            for epoch in range(1, self.epoch_count + 1):
                print(f"Epoch: {epoch}")
                losses = self.fit(train_loader, step_iter, epoch)

                if self.scheduler is not None:
                    self.scheduler.step()

                self.history["x"] += losses["x"]
                self.history["content"] += losses["content"]
                self.history["style"] += losses["style"]
                self.history["total"] += losses["total"]
                print(
                    f"Epoch {epoch}\n",
                    self.LOG_TEMPLATE.format(
                        loss_c=losses["content"][-1],
                        loss_s=losses["style"][-1],
                        loss_t=losses["total"][-1],
                    ),
                    "\n" + "-" * 56,
                )

                if epoch % step_epoch == 0:
                    iterobject = iter(train_loader())
                    contents, styles = next(iterobject)

                    self.model.eval()
                    with torch.no_grad():
                        mixs = self.model(contents.to(self.device), styles.to(self.device))

                    save_picture(
                        contents,
                        styles,
                        mixs.cpu(),
                        path=self.save_path.joinpath(f"img_{epoch}_end.png"),
                    )
        except KeyboardInterrupt:
            print("Предварительное окончание")
        finally:
            if not self.is_save:
                return self.history

            save_model(self.model.decoder, self.save_path)
            self.save_history()
            print("SAVED")

        return self.history

    def save_history(self):
        plt.clf()
        sleep(5)

        plt.figure(figsize=(10, 5))
        plt.plot(self.history["x"], self.history["content"], label="loss content")
        plt.plot(self.history["x"], self.history["style"], label="loss style")
        plt.plot(self.history["x"], self.history["total"], label="loss total")
        plt.legend(loc="best")
        plt.xlabel("epochs")
        plt.ylabel("loss")
        plt.savefig(self.save_path.joinpath("record.png"))
