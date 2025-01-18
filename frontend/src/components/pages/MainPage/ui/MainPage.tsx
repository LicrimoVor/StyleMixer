import { FC, memo, } from 'react';

import { StyleMixerProvider } from '@/stores/providers/styleMixer';
import { StyleMixerPanel } from '@/components/dummies/StyleMixerPanel';
import './MainPage.css';


/** Главная страница */
export const MainPage: FC = memo(() => {

    return (
      <StyleMixerProvider>
        <StyleMixerPanel/>
      </StyleMixerProvider>
    );
});
