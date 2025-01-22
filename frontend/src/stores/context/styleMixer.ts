import { Reducer, createContext, Dispatch, useContext } from "react";

import { StyleMix } from "@/entities/StyleMixer";

export interface StyleContext {
  styles: StyleMix[];
  isInited: boolean;
}

export const StyleMixerContext = createContext<{
  state: StyleContext;
  dispatch: (value: StyleMixerAction) => void;
}>({
  state: { isInited: false, styles: [] },
  dispatch: (value: StyleMixerAction) => {},
});

type IActionType = "create" | "addMix" | "init" | "delete";

/* eslint @typescript-eslint/no-explicit-any: "off" */
export interface StyleMixerAction {
  type: IActionType;
  id?: number;
  payload?: any;
  otherPayload?: any;
}

export const styleMixerReducer: Reducer<StyleContext, StyleMixerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "init": {
      const styles: StyleMix[] = Object.values(action.payload).map(
        (value: any, i) => ({
          ...value,
          mixs: value.mixs.map((val: any, i: number) => ({
            ...val,
            id: i,
            isLoading: false,
          })),
          id: i,
          isInited: true,
        })
      );
      return { isInited: true, styles };
    }

    case "create": {
      const styleMixer: StyleMix = action.payload;
      styleMixer.mixs = [];
      if (state.styles.length == 0) styleMixer.id = 0;
      else styleMixer.id = state.styles[state.styles.length - 1].id + 1;

      styleMixer.isInited = false;
      return { ...state, styles: [...state.styles, styleMixer] };
    }

    case "addMix": {
      if (!action.id) return state;

      return {
        isInited: true,
        styles: [
          ...state.styles.map((styleMixer) => {
            if (styleMixer.id === action.id) {
              const imageMix = action.payload;
              imageMix.id = styleMixer.mixs.length;

              return {
                ...styleMixer,
                id_api: action.otherPayload,
                isInited: true,
                mixs: [...styleMixer.mixs, imageMix],
              };
            }

            return styleMixer;
          }),
        ],
      };
    }
    case "delete": {
      return {
        ...state,
        styles: state.styles.filter((mix) => mix.id != action.id),
      };
    }
    default: {
      throw Error("Хз че за актион");
    }
  }
};

export const useStyleMixContext = () =>
  useContext<{ state: StyleContext; dispatch: Dispatch<StyleMixerAction> }>(
    StyleMixerContext
  );
