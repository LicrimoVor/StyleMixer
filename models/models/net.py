from typing import TypedDict, Union

from torch import nn, Tensor

from .libs.calc_mean_std import calc_mean_std
from .abstract import AbstractModule


def adain(content_features, style_features):
    """Adaptive Instance Normalization"""
    content_mean, content_std = calc_mean_std(content_features)
    style_mean, style_std = calc_mean_std(style_features)
    normalized_features = style_std * (content_features - content_mean) / content_std + style_mean
    return normalized_features


FeatureDict = TypedDict("FeatureDict", {"mid": Tensor, "end": Tensor})
ResponseDict = TypedDict(
    "ResponseDict",
    {
        "content_features": FeatureDict,
        "style_features": FeatureDict,
        "out_features": FeatureDict,
        "target_feature": Tensor,
        "out": Tensor,
    },
)


class StyleNet(AbstractModule):
    name = "style_net"

    def __init__(self, encoder: nn.Module, decoder: nn.Module):
        super().__init__()
        self.encoder = encoder
        self.decoder = decoder

    def __call__(
        self, contents: Tensor, styles: Tensor, alpha=1.0, out_features=False
    ) -> Union[Tensor, ResponseDict]:
        return super().__call__(contents, styles, alpha, out_features)

    def forward(
        self,
        contents: Tensor,
        styles: Tensor,
        alpha=1.0,
        out_features=False,
    ) -> Union[Tensor, ResponseDict]:
        *content_mid_feature, content_end_feature = self.encoder(contents, output_last_feature=True)
        *style_mid_features, style_end_feature = self.encoder(styles, output_last_feature=True)
        t = adain(content_end_feature, style_end_feature)
        target_feature = alpha * t + (1 - alpha) * content_end_feature
        out = self.decoder(target_feature)

        if out_features:
            *out_mid_features, out_end_feature = self.encoder(out, output_last_feature=True)
            return ResponseDict(
                content_features={"mid": content_mid_feature, "end": content_end_feature},
                style_features={"mid": style_mid_features, "end": style_end_feature},
                out_features={"mid": out_mid_features, "end": out_end_feature},
                target_feature=target_feature,
                out=out,
            )

        return out
