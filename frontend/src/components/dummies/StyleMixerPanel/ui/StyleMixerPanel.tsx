import { FC, memo, useCallback, useEffect, useState, } from 'react';

import { useStyleMixContext } from '@/stores/context/styleMixer';
import { createStyleMix } from '@/api/styleMix';
import {ImageMix, MixSettings, StyleMix} from '@/entities/StyleMixer'


import './StyleMixerPanel.css';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { StyleMixerCreator } from '@/components/widgets/StyleMixerCreator';
import { imgToBase64 } from '@/utils/imgToBase64';
import { StyleMixerSettings } from '@/components/widgets/StyleMixerSettings';
import { StyleMixerRedactor } from '@/components/widgets/StyleMixerRedactor';
import { Skeleton } from '@/components/shared/Skeleton';
import { StyleSettings } from '@/entities/StyleSettings';


interface StyleMixerPanelProps {
    className?: string,
};

/** Панель изменения стиля изображения */
export const StyleMixerPanel: FC <StyleMixerPanelProps> = memo((
    props: StyleMixerPanelProps
) => {
    const {
        className = '',
    } = props;
    const { state, dispatch } = useStyleMixContext();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (state.isInited === false) {

        }
    }, [])

    const onCreateStyleMix = useCallback((content: File, style: File, settings: StyleSettings) => {
        setRefresh(!refresh)
        
        Promise.all<string>([
            imgToBase64(content),
            imgToBase64(style),
        ]).then((values) => {
            dispatch({
                type: 'create',
                payload: { content: values[0], style: values[1] },
                otherPayload: settings,
            })
        })
    }, [refresh, setRefresh])

    return (
        <div className={'StyleMixerPanel ' + className}>
            <StyleMixerCreator callback={onCreateStyleMix} refresh={refresh} />
            {/* {
                state.isInited ?
                    <div className='StyleMixerPanelRedactors'>
                        {state.styles.map((styleMix, i) => <StyleMixerRedactor defaultSettings={settings} styleMix={styleMix} key={i}/>)}
                    </div> :
                    <div className='StyleMixerPanelRedactors'>
                        {[...Array(5).keys()].map((i) => <Skeleton key={i}/>)}
                    </div>
            } */}
            <div className='StyleMixerPanelRedactors'>
                {state.styles.map((styleMix, i) => <StyleMixerRedactor defaultSettings={styleMix.mix[0].settings} styleMix={styleMix} key={i}/>)}
            </div> :
            {/* <div className='StyleMixerPanelRedactors'>
                {[...Array(1).keys()].map((i) => <Skeleton key={i}/>)}
            </div>
             */}
        </div>
    );
});
