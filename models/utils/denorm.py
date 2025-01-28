import torch


def denorm(tensor: torch.Tensor) -> torch.Tensor:
    """Денормализует тензор."""
    mean = torch.Tensor((0.485, 0.456, 0.406)).reshape(-1, 1, 1).to(tensor.device)
    std = torch.Tensor((0.229, 0.224, 0.225)).reshape(-1, 1, 1).to(tensor.device)
    res = torch.clamp(tensor * std + mean, 0, 1)
    return res
