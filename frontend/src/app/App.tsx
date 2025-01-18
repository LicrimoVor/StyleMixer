import './styles/font.css'
import './styles/theme.css';
import './styles/general.css';
import { AppRouter } from './router/Router'
import { Header } from '@/components/layouts/Header';


function App() {
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
