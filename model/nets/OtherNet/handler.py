import torch
from torchvision import transforms

from utils.denorm import denorm

from ..abstract import DataType


normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
trans = transforms.Compose([transforms.ToTensor(), normalize])


def handler(model: torch.nn.Module, data: DataType, device: torch.device):
    content = trans(data["content"]).unsqueeze(0).to(device)
    style = trans(data["style"]).unsqueeze(0).to(device)
    alpha = data["alpha"]

    with torch.no_grad():
        out = model.generate(content, style, alpha)

    return denorm(out)
