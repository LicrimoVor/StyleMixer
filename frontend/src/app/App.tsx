
import { useCookies } from 'react-cookie';

import { Header } from '@/components/layouts/Header';
import { createToken } from '@/api/createToken';
import { useInitialEffect } from '@/utils/useInitialEffect';
import { cookieKeyToken } from '@/config/const';
import { checkToken } from '@/api/checkToken';

import { AppRouter } from './router/Router'
import './styles/font.css'
import './styles/theme.css';
import './styles/general.css';

export const App = () => {

    const [cookies, setCookie, _] = useCookies()
    useInitialEffect(() => {
        const callback = () => createToken().then(() => setCookie(cookieKeyToken, true));
        if (!cookies[cookieKeyToken]) callback()
        else checkToken().catch(callback)
    })

    return (
        <div className="App">
            <Header />
            <div className='content'>
                <AppRouter />
            </div>
        </div>
    );
}
