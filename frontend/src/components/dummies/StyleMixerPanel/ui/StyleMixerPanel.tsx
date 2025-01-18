import { FC, memo, useCallback, useState, } from 'react';

import { useImageMixContext } from '@/stores/context/styleMixer';
import { createStyleMix } from '@/api/styleMix';
import {ImageMix, MixSettings} from '@/entities/StyleMixer'


import './StyleMixerPanel.css';
import { ImageUploader } from '@/components/ui/ImageUploader';
import { StyleMixerCreator } from '@/components/widgets/StyleMixerCreator';
import { imgToBase64 } from '@/utils/imgToBase64';
import { StyleMixerViewer } from '@/components/widgets/StyleMixerViewer';
import { StyleMixerSettings } from '@/components/widgets/StyleMixerSettings';


interface StyleMixerPanelProps {
    className?: string,
};

/** Панель изменения стиля изображения */
export const StyleMixerPanel: FC <StyleMixerPanelProps> = memo((
    props: StyleMixerPanelProps
) => {
    const {
        className,
    } = props;
    const { state, dispatch } = useImageMixContext();
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<MixSettings>({ model: 'VGG19'})
    const [refresh, setRefresh] = useState(false);

    const onCreateStyleMix = useCallback((content: File, style: File) => {
        setIsLoading(true);
        setRefresh(!refresh)
        
        Promise.all<string|ArrayBuffer>([
            imgToBase64(content),
            imgToBase64(style),
        ]).then((values) => {
            dispatch({type: 'create', payload: {content: values[0], style: values[1]}})
            setIsLoading(false)
        })
    }, [refresh, setRefresh])

    return (
        <div className='StyleMixerPanel'>
            <StyleMixerSettings settings={settings} onChange={setSettings}/>
            <StyleMixerCreator callback={onCreateStyleMix} refresh={refresh} />
            {state.map((styleMix, i) => <StyleMixerViewer defaultSettings={settings} styleMix={styleMix} key={i}/>)}
        </div>
    );
});
