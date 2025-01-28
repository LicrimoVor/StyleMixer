"""Обучение модели."""

from pathlib import Path
from typing import Literal

import torch
from torch.utils.data import DataLoader

from nets.libs.loss import StyleLoss
from nets.encoder import Encoder
from nets.decoder import Decoder
from nets.net import StyleNet

from utils.loader import create_loader
from utils.save_picture import save_picture
from utils.dataset import StyleDataset
from utils.trainer import StyleTrainer
from utils.profiler import profiler


if __name__ == "__main__":
    BASE_PATH = Path(__file__).parent

    EPOCHS = 10
    BATCH_SIZE = 32
    SIZE = 128, 128

    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    MODE: Literal["train", "profile", "test"] = "profile"

    print("init dataset")
    content_paths = list(BASE_PATH.joinpath("data/coco2017").glob("**/*.jpg"))
    style_paths = list(BASE_PATH.joinpath("data/wikiart").glob("**/*.jpg"))
    minimal_length = min(len(content_paths), len(style_paths))
    dataset_content = StyleDataset(content_paths[:minimal_length], SIZE)
    dataset_style = StyleDataset(style_paths[:minimal_length], SIZE)

    dataloader_content = DataLoader(
        dataset_content, BATCH_SIZE, shuffle=True, drop_last=True, num_workers=6
    )
    dataloader_style = DataLoader(
        dataset_style, BATCH_SIZE, shuffle=True, drop_last=True, num_workers=6
    )
    loader = create_loader(dataloader_content, dataloader_style)

    print("init model")

    encoder = Encoder().to(DEVICE)
    decoder = Decoder.load(BASE_PATH.joinpath("models/StyleNet/Decoder/model")).to(DEVICE)
    model = StyleNet(encoder, decoder).to(DEVICE)

    loss_f = StyleLoss(w_style=10)
    optimizer = torch.optim.Adam(model.decoder.parameters(), lr=1e-5)
    scheduler = torch.optim.lr_scheduler.StepLR(optimizer, 4, 0.5)
    trainer = StyleTrainer(model, loss_f, optimizer, EPOCHS, DEVICE, scheduler=scheduler, save=True)

    print(f"mode: {MODE}")
    match MODE:
        case "train":
            history = trainer.train(loader, step_epoch=1, step_iter=80_000 // BATCH_SIZE)
        case "profile":
            profiler(loader, trainer)
        case "train":
            contents, styles = next(iter(loader()))
            mixs = model(contents, styles)
            save_picture(
                contents.cpu(), styles.cpu(), mixs.cpu(), path=BASE_PATH.joinpath("test.png")
            )
