import axios from "axios";

import { apiUrl } from "@/config/const";
import { ImageMix } from "@/entities/StyleMixer";

URL.createObjectURL;

export const createStyleMix = async (props: ImageMix) =>
  axios.post(
    apiUrl + "/image",
    { base: props.base_image, style: props.style_image },
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
