import axios from "axios";

import { StyleSettings } from "@/entities/StyleSettings";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const hostUrl = import.meta.env.DEV
  ? "http://127.0.0.1:8000"
  : import.meta.env.VITE_HOST_URL;

export const apiObj = axios.create({
  withCredentials: true,
  baseURL: hostUrl + "/api",
});

export const cookieKeyToken = "__token_session";
export const DefaultStyleSettings: StyleSettings = {
  model: "VGG16",
  size: "128",
  alpha: 0.5,
};

export const COUNT_RANDOM_STYLES = 9;
