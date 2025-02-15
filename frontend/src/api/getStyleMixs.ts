import { apiObj, hostUrl } from "@/config/const";
import { StyleMix } from "@/entities/StyleMixer";

type ResponseStyleMix = Record<number, Omit<StyleMix, "isInited" | "id">>;

/** Получить все миксы */
export const getStyleMixs = async () =>
  apiObj.get<ResponseStyleMix>("/image").then((response) => {
    response.data = Object.values(response.data).map((stylemix) => ({
      id_api: stylemix.id_api,
      style: hostUrl + stylemix.style,
      content: hostUrl + stylemix.content,
      mixs: stylemix.mixs.map((mix) => ({ ...mix, img: hostUrl + mix.img })),
    }));
    return response;
  });
