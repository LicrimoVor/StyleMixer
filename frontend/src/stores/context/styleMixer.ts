import { Reducer, createContext, Dispatch, useContext } from "react";

import { StyleMix } from "@/entities/StyleMixer";

export const StyleMixerContext = createContext<{
  state: StyleMix[];
  dispatch: (value: StyleMixerAction) => void;
}>({
  state: [],
  dispatch: (value: StyleMixerAction) => {},
});

type IActionType = "create" | "addMix";

export interface StyleMixerAction {
  type: IActionType;
  indx?: number;
  payload?: any;
}

export const styleMixerReducer: Reducer<StyleMix[], StyleMixerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "create": {
      const styleMixer = action.payload;
      return [...state, styleMixer];
    }

    case "addMix": {
      if (action.indx == undefined || action.indx >= state.length) {
        return state;
      }

      return [
        ...state.map((styleMixer, indx) => {
          if (indx === action.indx) {
            return {
              ...styleMixer,
              mix: [...styleMixer.mix, action.payload],
            };
          }

          return styleMixer;
        }),
      ];
    }
    default: {
      throw Error("Хз че за актион");
    }
  }
};

export const useImageMixContext = () =>
  useContext<{ state: StyleMix[]; dispatch: Dispatch<StyleMixerAction> }>(
    StyleMixerContext
  );
