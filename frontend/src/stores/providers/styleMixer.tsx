import { FC, ReactNode, memo, useReducer } from 'react';

import { StyleContext, StyleMixerContext, styleMixerReducer } from '../context/styleMixer';

interface StyleMixerProviderProps {
    children: ReactNode,
};
const initialState: StyleContext = {
    isInited: false,
    styles: []
};

/** Провайдер миксера изображений */
export const StyleMixerProvider: FC<StyleMixerProviderProps> = memo((props) => {
    const {
        children,
    } = props;

    const [state, dispatch] = useReducer(styleMixerReducer, initialState);

    return (
        <StyleMixerContext.Provider value={{state, dispatch}}>
            {children}
        </StyleMixerContext.Provider>
    );
});
