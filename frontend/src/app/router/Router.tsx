import { FC, memo, useCallback } from 'react';
import {Route, Routes } from 'react-router-dom'

import { routerConfig, elementConfig } from '@/config/routerConfig';

/** Роутер */
export const AppRouter: FC = memo(() => {
    const renderElement = useCallback((props: elementConfig) => {
        return <Route path={props.path} element={props.element} key={props.path} />
    }, [])
    
    return (
        <Routes>
            {Object.values(routerConfig).map(renderElement)}
        </Routes>
    );
});
