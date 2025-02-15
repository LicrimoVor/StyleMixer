import { StyleSettings } from "./StyleSettings";

export type ImageMix = {
  id: number;
  settings: StyleSettings;
  isLoading: boolean;
  img?: string;
  error?: string;
};

export type StyleMix = {
  id_api?: number;
  id: number;
  isInited: boolean;
  content: string;
  style: string;
  mixs: Array<ImageMix>;
};
