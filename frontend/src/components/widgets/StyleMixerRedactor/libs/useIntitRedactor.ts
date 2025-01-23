import { createImageMix } from "@/api/createImageMix";
import { createStyleMix } from "@/api/createStyleMix";
import { ImageMix, StyleMix } from "@/entities/StyleMixer";
import { StyleSettings } from "@/entities/StyleSettings";
import { useStyleMixContext } from "@/stores/context/styleMixer";
import { useInitialEffect } from "@/utils/useInitialEffect";
import { useState } from "react";

export const useInitRedactor = (
  styleMix: StyleMix,
  settings: StyleSettings
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useStyleMixContext();

  useInitialEffect(() => {
    if (styleMix.isInited) return;

    setIsLoading(true);
    createStyleMix({ styleMix }).then((value) => {
      dispatch({ type: "update", id: styleMix.id, payload: value.data });
      createImageMix({ id_api: value.data.id_api, settings })
        .then((value) => {
          const imageMix: ImageMix = {
            id: -1,
            img: value.data.img,
            settings: value.data.settings,
            isLoading: false,
          };
          setIsLoading(false);
          dispatch({ type: "addMix", id: styleMix.id, payload: imageMix });
        })
        .catch((reason) => {
          setIsLoading(false);
          const error =
            reason.response?.data?.detail ||
            reason.response?.data?.error ||
            reason.message;
          const imageMix = {
            settings,
            error,
            isLoading: false,
          };
          dispatch({ type: "addMix", id: styleMix.id, payload: imageMix });
        });
    });
  });

  return { isLoading, setIsLoading };
};
