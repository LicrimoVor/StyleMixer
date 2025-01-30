import { Reducer, createContext, Dispatch, useContext } from "react";

export interface GeneralContext {
  isAdmin: boolean;
  isInited: boolean;
}

export const GeneralContext = createContext<{
  state: GeneralContext;
  dispatch: (value: GeneralAction) => void;
}>({
  state: { isInited: false, isAdmin: false },
  dispatch: (value: GeneralAction) => {},
});

type IActionType = "init" | "setAdmin";

/* eslint @typescript-eslint/no-explicit-any: "off" */
export interface GeneralAction {
  type: IActionType;
  payload?: any;
}

export const GeneralReducer: Reducer<GeneralContext, GeneralAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "init": {
      return state;
    }

    case "setAdmin": {
      return {
        ...state,
        isAdmin: true,
      };
    }
    default: {
      throw Error("Хз че за актион");
    }
  }
};

export const useGeneralContext = () =>
  useContext<{ state: GeneralContext; dispatch: Dispatch<GeneralAction> }>(
    GeneralContext
  );
