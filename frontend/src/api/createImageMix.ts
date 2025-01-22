import { apiObj } from "@/config/const";
import { ImageMix, StyleMix } from "@/entities/StyleMixer";
import { StyleSettings } from "@/entities/StyleSettings";

interface PropsImageMix {
  styleMix: StyleMix;
  settings: StyleSettings;
}
type ResponseImageMix = Omit<ImageMix, "isLoading" | "id"> & { id_api: number };

/** Создание микса стилизации */
export const createImageMix = async ({ styleMix, settings }: PropsImageMix) =>
  apiObj.post<ResponseImageMix>(
    "/image",
    {
      content: styleMix.content,
      style: styleMix.style,
      settings: JSON.stringify(settings),
    },
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
