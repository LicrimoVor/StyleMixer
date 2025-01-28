from torch import Tensor


# def calc_mean_std(features: Tensor):
#     """Определить mean и std."""
#     batch_size, canals = features.shape[:2]
#     feat_var = features.view(batch_size, canals, -1).var(dim=2) + 1e-6
#     feat_std = feat_var.sqrt().view(batch_size, canals, 1, 1)
#     feat_mean = features.view(batch_size, canals, -1).mean(dim=2).view(batch_size, canals, 1, 1)
#     return feat_mean, feat_std


def calc_mean_std(features: Tensor, eps=1e-5):
    N, C = features.shape[:2]
    feat_var = features.view(N, C, -1).var(dim=2) + eps
    feat_std = feat_var.sqrt().view(N, C, 1, 1)
    feat_mean = features.view(N, C, -1).mean(dim=2).view(N, C, 1, 1)
    return feat_mean, feat_std
