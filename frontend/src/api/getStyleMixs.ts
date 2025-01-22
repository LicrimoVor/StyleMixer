import { apiObj } from "@/config/const";
import { StyleMix } from "@/entities/StyleMixer";

type ResponseStyleMix = Record<number, Omit<StyleMix, "isInited" | "id">>;

/** Получить все миксы */
export const getStyleMixs = async () => apiObj.get<ResponseStyleMix>("/image");
