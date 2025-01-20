import axios from "axios";

import { apiUrl } from "@/config/const";
import { ImageMix, StyleMix } from "@/entities/StyleMixer";
import { StyleSettings } from "@/entities/StyleSettings";

interface PropsImageMix {
  styleMix: StyleMix;
  settings: StyleSettings;
}
type ResponseImageMix = Omit<ImageMix, "isLoading" | "id">;

export const createImageMix = async ({ styleMix, settings }: PropsImageMix) =>
  axios.post<ResponseImageMix>(
    apiUrl + "/image",
    {
      content: styleMix.content,
      style: styleMix.style,
      settings: JSON.stringify(settings),
    },
    {
      withCredentials: true,
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
