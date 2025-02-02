import { Size } from "@/entities/StyleSettings";
import { Model } from "@/entities/StyleSettings";

export type ListBoxItem<T> = {
  value: T;
  readonly?: boolean;
};

export const DataModels: ListBoxItem<Model>[] = [
  { value: "VGG16" },
  { value: "VGG19", readonly: !(import.meta.env.VITE_MODEL_VGG_19 == "True") },
];

export const DataSizes: ListBoxItem<Size>[] = [
  { value: "128" },
  { value: "256" },
  { value: "512" },
];
