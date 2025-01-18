declare module "*.svg" {
  import React from "react";

  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
