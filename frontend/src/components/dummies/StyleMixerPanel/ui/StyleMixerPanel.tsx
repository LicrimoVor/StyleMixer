import { FC, memo, useCallback, useMemo, useState, } from 'react';

import { useStyleMixContext } from '@/stores/context/styleMixer';
import { imgToBase64 } from '@/utils/imgToBase64';
import { useInitialEffect } from '@/utils/useInitialEffect';
import { StyleMixerRedactor } from '@/components/widgets/StyleMixerRedactor';
import { Skeleton } from '@/components/shared/Skeleton';
import { StyleMixerCreator } from '@/components/widgets/StyleMixerCreator';
import { StyleSettings } from '@/entities/StyleSettings';
import { DefaultStyleSettings } from '@/config/const';
import { getStyleMixs } from '@/api/getStyleMixs';

import './StyleMixerPanel.css';

interface StyleMixerPanelProps {
    className?: string,
};

const SkeletonRedactor: FC = memo(() => (
    <div style={{gap: 16, width: '100%'}} className='HStack'>
        <div style={{gap: 16}} className='VStack'>
            <Skeleton className='SkeletonRedactorTitle' width={100} height={24}/>
            <div className='StyleMixerRedactorImgs'>
                <Skeleton width={150} height={150} border='8px'/>
                <Skeleton width={43} height={43} border='8px'/>
                <Skeleton width={150} height={150} border='8px'/>
            </div>
            <Skeleton width={130} height={57} border='8px'/>
        </div>
        <Skeleton className='SkeletonRedactorViews' width='100%' border='20px'/>
    </div>
))


const SettingsDescription = memo(() => (
    <div className='Card'>
        <h3 style={{margin: 0}}>Settings</h3>
        <p style={{margin: 0}}>m - model (архитектура модели)</p>
        <p style={{margin: 0}}>s - size (размер изображения)</p>
        <p style={{margin: 0}}>a - alpha (коэффициент стилизации)</p>
    </div>
))


/** Панель изменения стиля изображения */
export const StyleMixerPanel: FC <StyleMixerPanelProps> = memo((
    props: StyleMixerPanelProps
) => {
    const {
        className = '',
    } = props;

    const { state, dispatch } = useStyleMixContext();
    const [settings, setSettings] = useState<StyleSettings>(DefaultStyleSettings);
    const [refresh, setRefresh] = useState(false);

    useInitialEffect(() => {
            getStyleMixs().then((value) => {
                dispatch({
                    type: 'init',
                    payload: value.data || [],
                })
            }).catch(() => {
                dispatch({type: 'init', payload: []})
            })
    })

    const onCreateStyleMix = useCallback((content: File, style: File, settings: StyleSettings) => {
        setRefresh(!refresh)
        setSettings(settings)
        
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
    }, [refresh, setRefresh, setSettings])

    const Views = useMemo(() => (
        state.styles.map((styleMix, i) => (
            <StyleMixerRedactor
                defaultSettings={settings}
                styleMix={styleMix}
                key={i}
            />
        ))
    ), [state.styles])

    return (
        <div className={'StyleMixerPanel ' + className}>
            <div className='StyleMixerPanelHead'>
                <SettingsDescription />
                <StyleMixerCreator
                    className='StyleMixerPanelHeadCreator'
                    callback={onCreateStyleMix}
                    refresh={refresh}
                />
            </div>
            <div className='StyleMixerPanelRedactors'>
                {state.isInited ?
                    Views:
                    [...Array(2).keys()].map((i) => <SkeletonRedactor key={i}/>)
                }
            </div>
        </div>
    );
});
