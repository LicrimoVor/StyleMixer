from torch import Tensor


def calc_mean_std(features: Tensor, eps=1e-5):
    """Возвращает mean и std фичей."""
    N, C = features.shape[:2]
    feat_var = features.view(N, C, -1).var(dim=2) + eps
    feat_std = feat_var.sqrt().view(N, C, 1, 1)
    feat_mean = features.view(N, C, -1).mean(dim=2).view(N, C, 1, 1)
    return feat_mean, feat_std
