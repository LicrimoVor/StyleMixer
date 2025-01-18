import axios from "axios";

import { apiUrl } from "@/config/const";
import { StyleMix } from "@/entities/StyleMixer";

type ResponseStyleMix = Record<number, Omit<StyleMix, "isInited" | "id">>;

export const getStyleMixs = async () =>
  axios.get<ResponseStyleMix>(apiUrl + "/image");
