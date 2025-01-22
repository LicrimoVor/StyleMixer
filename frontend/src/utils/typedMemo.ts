import { memo, ComponentPropsWithoutRef, FC } from "react";

/* eslint @typescript-eslint/no-explicit-any: "off" */
/** Типизированный мемо с дженираками */
export const typedMemo: <Component extends FC<any>>(
  component: Component,
  compare?: (
    prevProps: ComponentPropsWithoutRef<Component>,
    newProps: ComponentPropsWithoutRef<Component>
  ) => boolean
) => Component = memo;
