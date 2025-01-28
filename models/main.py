"""Обучение модели."""

from pathlib import Path

import torch
from torch.utils.data import DataLoader

from models.libs.loss import StyleLoss
from models.encoder import Encoder
from models.decoder import Decoder

# from models.decoder2 import Decoder as Decoder2
from models.net import StyleNet

from utils.loader import create_loader
from utils.save_picture import save_picture
from utils.dataset import StyleDataset
from utils.trainer import StyleTrainer
from utils.profiler import profiler


if __name__ == "__main__":
    BASE_PATH = Path(__file__).parent
    MAGIC_NUMER = 42
    BATCH_SIZE = 32
    SIZE = 128, 128
    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    # DEVICE = "cpu"

    # np.random.seed(MAGIC_NUMER)
    # torch.manual_seed(MAGIC_NUMER)
    # torch.cuda.manual_seed(MAGIC_NUMER).

    content_paths = list(BASE_PATH.joinpath("data/coco2017").glob("**/*.jpg"))
    style_paths = list(BASE_PATH.joinpath("data/wikiart").glob("**/*.jpg"))
    minimal_length = min(len(content_paths), len(style_paths))
    dataset_content = StyleDataset(content_paths[:minimal_length], SIZE)
    dataset_style = StyleDataset(style_paths[:minimal_length], SIZE)

    dataloader_content = DataLoader(
        dataset_content, BATCH_SIZE, shuffle=True, drop_last=True, num_workers=8
    )
    dataloader_style = DataLoader(
        dataset_style, BATCH_SIZE, shuffle=True, drop_last=True, num_workers=8
    )
    loader = create_loader(dataloader_content, dataloader_style)

    print("init model")
    EPOCHS = 10
    encoder = Encoder().to(DEVICE)
    decoder = Decoder().to(DEVICE)
    # decoder = Decoder.load(BASE_PATH.joinpath("models/StyleNet/28-01-2025_13-01/Decoder/model"))
    model = StyleNet(encoder, decoder).to(DEVICE)
    loss_f = StyleLoss(w_style=10)
    optimizer = torch.optim.Adam(model.decoder.parameters(), lr=2e-4)
    scheduler = torch.optim.lr_scheduler.StepLR(optimizer, 4, 0.5)
    trainer = StyleTrainer(model, loss_f, optimizer, EPOCHS, DEVICE, scheduler=scheduler, save=True)
    # history = trainer.train(loader, step_epoch=1, step_iter=40_000 // BATCH_SIZE)
    profiler(loader, trainer)

    # contents, styles = next(iter(loader()))
    # mixs = model(contents, styles)
    # save_picture(contents, styles, mixs, path=BASE_PATH.joinpath("test.png"))
