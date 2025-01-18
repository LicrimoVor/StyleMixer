import { FC, memo, useCallback, useEffect, useRef, useState, } from 'react';

import Plus from '@/assets/plus.png';
import { useStyleMixContext } from '@/stores/context/styleMixer';
import { Image } from '@/components/shared/Image';
import { StyleSettings } from '@/entities/StyleSettings';
import { StyleMix } from '@/entities/StyleMixer';
import { StyleMixerViewer } from '../../StyleMixerViewer';
import { StyleMixerSettings } from '../../StyleMixerSettings';
import './StyleMixerRedactor.css';
import { createImageMix } from '@/api/createImageMix';

interface StyleMixerRedactorProps {
    className?: string,
    defaultSettings: StyleSettings,
    styleMix: StyleMix,
};
/** Редактирование и создание новых styleMix */
export const StyleMixerRedactor: FC <StyleMixerRedactorProps> = memo((
    props: StyleMixerRedactorProps
) => {
    const {
        className = '',
        defaultSettings,
        styleMix,
    } = props;

    const isInitedRef = useRef(styleMix.isInited);
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<StyleSettings>(defaultSettings);
    const { dispatch } = useStyleMixContext()

    useEffect(() => {
        if (!isInitedRef.current) {
            isInitedRef.current = true
            onCreateMix()
        }
    }, [isInitedRef])

    const onCreateMix = useCallback(() => {
        if (isLoading) return;

        setIsLoading(true);
        createImageMix({ styleMix, settings })
            .then((value) => {
                const imageMix = {
                    ...value.data,
                    isLoading: false,
                }
                setIsLoading(false)
                dispatch({ type: 'addMix', id: styleMix.id, payload: imageMix })
            }).catch((reason) => {
                setIsLoading(false)
                const imageMix = {
                    settings,
                    error: reason.message,
                    isLoading: false,
                }
                dispatch({ type: 'addMix', id: styleMix.id, payload: imageMix })
        })
    }, [settings, styleMix, dispatch, setIsLoading, isLoading,])

    return (
        <div className={'StyleMixerRedactor0 ' + className}>
            <div className='StyleMixerRedactor'>
                <h3 className='StyleMixerRedactoTitle'>№ {styleMix.id+1}</h3>
                <div className='StyleMixerRedactorImgs'>
                    <Image src={styleMix.content} size={150} border={8} open/>
                    <button
                        className='StyleMixerRedactorBtn'
                        onClick={onCreateMix}
                    >
                        <img src={Plus}/>
                    </button>
                    <Image src={styleMix.style} size={150} border={8} open/>
                </div>
                <StyleMixerSettings settings={settings} onChange={setSettings} />
            </div>
            <div className='StyleMixerRedactorViews'>
                {styleMix.mix.map((mix, i) => <StyleMixerViewer imageMix={mix} key={i} />)}
                {isLoading && <StyleMixerViewer imageMix={{id: styleMix.mix.length, isLoading: true, settings}} />}
            </div>
        </div>
    );
});
