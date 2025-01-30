export type Model = "VGG16" | "VGG19";
export type Size = "128" | "256" | "512" | "-1";

/** Настройки для style mixer */
export interface StyleSettings {
  model: Model;
  size: Size;
  alpha: number;
}
