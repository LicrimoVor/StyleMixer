from torch import Tensor


def calc_mean_std(features: Tensor):
    """Определить mean и std."""
    batch_size, c = features.size()[:2]
    features_mean = features.reshape(batch_size, c, -1).mean(dim=2).reshape(batch_size, c, 1, 1)
    features_std = (
        features.reshape(batch_size, c, -1).std(dim=2).reshape(batch_size, c, 1, 1) + 1e-6
    )
    return features_mean, features_std
