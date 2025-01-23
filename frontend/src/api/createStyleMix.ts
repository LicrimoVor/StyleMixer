import { apiObj, apiUrl } from "@/config/const";
import { StyleMix } from "@/entities/StyleMixer";

interface PropsImageMix {
  styleMix: StyleMix;
}
type ResponseStyleMix = {
  content: string;
  style: string;
  id_api: number;
};

/** Создание микса стилизации */
export const createStyleMix = async ({ styleMix }: PropsImageMix) =>
  apiObj
    .post<ResponseStyleMix>(
      "/image",
      {
        content: styleMix.content,
        style: styleMix.style,
      },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      response.data.content = apiUrl + response.data.content;
      response.data.style = apiUrl + response.data.style;
      return response;
    });
