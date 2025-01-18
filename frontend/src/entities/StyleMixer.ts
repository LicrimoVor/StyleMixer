export type MixSettings = {
  model: "VGG19";
};

export type ImageMix = {
  settings: MixSettings;
  img: string;
};

export type StyleMix = {
  content: string;
  style: string;
  mix: Array<ImageMix>;
};
