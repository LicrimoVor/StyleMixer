from __future__ import annotations
from typing import TYPE_CHECKING, Union

from torch import Tensor
import torch.nn.functional as F

from .calc_mean_std import calc_mean_std

if TYPE_CHECKING:
    from ..StyleNet.net import ResponseDict


class StyleLoss:
    """Лосс для style-net"""

    def __init__(self, w_style: float):
        self.w_style = w_style
        self.loss_style = 0
        self.loss_content = 0

    def __call__(self, response: ResponseDict, all_loss=False) -> Union[Tensor, tuple[Tensor]]:
        self.loss_content = self.calc_content(
            response["out_features"]["end"], response["target_feature"]
        )
        self.loss_style = self.calc_style(
            response["out_features"]["mid"], response["style_features"]["mid"]
        )

        self.loss_total = self.loss_content + self.w_style * self.loss_style

        if all_loss:
            return self.loss_content, self.loss_style, self.loss_total
        return self.loss_total

    @staticmethod
    def calc_content(out_end_feature: Tensor, target_feature: Tensor) -> Tensor:
        """Потеря контента."""
        return F.mse_loss(out_end_feature, target_feature)

    @staticmethod
    def calc_style(out_mid_features: list[Tensor], style_mid_features: list[Tensor]) -> Tensor:
        """Потеря стиля."""
        loss = 0
        for out_feature, style_feature in zip(out_mid_features, style_mid_features):
            out_mean, out_std = calc_mean_std(out_feature)
            style_mean, style_std = calc_mean_std(style_feature)
            loss += F.mse_loss(out_mean, style_mean) + F.mse_loss(out_std, style_std)
        return loss
