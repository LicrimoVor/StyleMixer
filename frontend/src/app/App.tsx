
import { useCookies } from 'react-cookie';

import { Header } from '@/components/layouts/Header';
import { createToken } from '@/api/createToken';
import { useInitialEffect } from '@/utils/useInitialEffect';
import { AppRouter } from './router/Router'
import './styles/font.css'
import './styles/theme.css';
import './styles/general.css';
import { cookieKeyToken } from '@/config/const';

function App() {

  const [cookies, setCookie, _] = useCookies()
  useInitialEffect(() => {
    console.log(cookies)
    if (!cookies[cookieKeyToken]) {
      createToken().then(() => setCookie(cookieKeyToken, true))
    }
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

export default App;
