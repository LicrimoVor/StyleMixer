import { StyleSettings } from "@/entities/StyleSettings";
import axios from "axios";

export const apiUrl = "http://127.0.0.1:8000/api";
export const apiObj = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
});

export const cookieKeyToken = "__token_session";
export const DefaultStyleSettings: StyleSettings = {
  model: "VGG16",
  size: "128",
  alpha: 0.5,
};
