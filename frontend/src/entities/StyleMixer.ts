import { StyleSettings } from "./StyleSettings";

export type ImageMix = {
  settings: StyleSettings;
  img?: string;
  error?: string;
  isLoading: boolean;
};

export type StyleMix = {
  id: number;
  isInited: boolean;
  content: string;
  style: string;
  mix: Array<ImageMix>;
};
