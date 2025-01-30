
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import { Header } from '@/components/layouts/Header';
import { createToken } from '@/api/createToken';
import { useInitialEffect } from '@/utils/useInitialEffect';
import { cookieKeyToken } from '@/config/const';
import { checkToken } from '@/api/checkToken';
import { GeneralProvider } from '@/stores/providers/general';

import { AppRouter } from './router/Router'
import './styles/font.css'
import './styles/theme.css';
import './styles/general.css';


export const App = () => {

    const [cookies, setCookie, _] = useCookies()

    const [viability, setViability] = useState<string>() // КОСТЫЛЬ!

    useInitialEffect(() => {
        const callback = () => createToken().then(() => setCookie(cookieKeyToken, true));
        if (!cookies[cookieKeyToken]) callback()
        else checkToken().then(response => setViability(response.data.viability)).catch(callback)
    })

    return (
        <div className="App">
            <GeneralProvider>
                <Header viability={viability} />
                <div className='content'>
                    <AppRouter />
                </div>
            </GeneralProvider>
        </div>
    );
}
