import { apiObj, apiUrl } from "@/config/const";
import { StyleSettings } from "@/entities/StyleSettings";

interface PropsImageMix {
  id_api: number;
  settings: StyleSettings;
}
type ResponseImageMix = {
  settings: StyleSettings;
  img: string;
};

/** Создание микса стилизации */
export const createImageMix = async ({ id_api, settings }: PropsImageMix) =>
  apiObj
    .post<ResponseImageMix>("/image/" + id_api + "/mix", settings, {
      headers: { "content-type": "application/json" },
    })
    .then((reponse) => {
      reponse.data.img = apiUrl + reponse.data.img;
      return reponse;
    });
