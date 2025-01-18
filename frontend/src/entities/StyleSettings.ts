export type Model = "VGG16" | "VGG19";
export type Size = "128" | "256" | "512";

export interface StyleSettings {
  model: Model;
  size: Size;
}
