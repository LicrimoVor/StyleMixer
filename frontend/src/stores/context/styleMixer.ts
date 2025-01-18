import { Reducer, createContext, Dispatch, useContext, act } from "react";

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

type IActionType = "create" | "addMix" | "init";

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
      const styles: StyleMix[] = action.payload.map((style: StyleMix) => ({
        ...style,
        isInited: true,
      }));
      return { isInited: true, styles };
    }

    case "create": {
      const styleMixer: StyleMix = action.payload;
      styleMixer.mix = [{ isLoading: true, settings: action.otherPayload }];
      styleMixer.id = state.styles.length;
      styleMixer.isInited = false;
      return { ...state, styles: [...state.styles, styleMixer] };
    }

    case "addMix": {
      if (action.id == undefined || action.id >= state.styles.length) {
        return state;
      }

      return {
        isInited: true,
        styles: [
          ...state.styles.map((styleMixer, indx) => {
            if (indx === action.id) {
              return {
                ...styleMixer,
                mix: [...styleMixer.mix, action.payload],
              };
            }

            return styleMixer;
          }),
        ],
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
