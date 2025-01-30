import { FC, ReactNode, memo, useReducer } from 'react';

import { GeneralContext, GeneralReducer } from '../context/general';

interface GeneralProviderProps {
    children: ReactNode,
};
const initialState: GeneralContext = {
    isInited: false,
    isAdmin: false,
};

/** Провайдер обшего стейта */
export const GeneralProvider: FC<GeneralProviderProps> = memo((props) => {
    const {
        children,
    } = props;

    const [state, dispatch] = useReducer(GeneralReducer, initialState);

    return (
        <GeneralContext.Provider value={{state, dispatch}}>
            {children}
        </GeneralContext.Provider>
    );
});
