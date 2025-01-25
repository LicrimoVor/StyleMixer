from __future__ import annotations
from typing import TYPE_CHECKING

from torch import Tensor
import torch.nn.functional as F

from .calc_mean_std import calc_mean_std

if TYPE_CHECKING:
    from ..net import ResponseDict


class StyleLoss:
    """Лосс для style-net"""

    def __init__(self, w_style: float):
        self.w_style = w_style

    def __call__(self, response: ResponseDict) -> Tensor:
        loss_c = self.content_loss(response["out_features"]["end"], response["target_feature"])
        loss_s = self.style_loss(response["out_features"]["mid"], response["style_features"]["mid"])
        loss = loss_c + self.w_style * loss_s
        return loss

    @staticmethod
    def content_loss(out_end_feature: Tensor, target_feature: Tensor) -> Tensor:
        """Потеря контента."""
        return F.mse_loss(out_end_feature, target_feature)

    @staticmethod
    def style_loss(content_mid_features: list[Tensor], style_mid_features: list[Tensor]) -> Tensor:
        """Потеря стиля."""
        loss = 0
        for content_feature, style_feature in zip(content_mid_features, style_mid_features):
            content_mean, content_std = calc_mean_std(content_feature)
            style_mean, style_std = calc_mean_std(style_feature)
            loss += F.mse_loss(content_mean, style_mean) + F.mse_loss(content_std, style_std)
        return loss
