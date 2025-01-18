import { FC, memo, useCallback, } from 'react';


import { ImageMix, StyleMix } from '@/entities/StyleMixer';
import Plus from '@/assets/plus.png';
import { StyleMixerViewer } from '../../StyleMixerViewer';
import { StyleMixerSettings } from '../../StyleMixerSettings';
import './StyleMixerRedactor.css';
import { useStyleMixContext } from '@/stores/context/styleMixer';
import { Image } from '@/components/shared/Image';
import { StyleSettings } from '@/entities/StyleSettings';
import { Skeleton } from '@/components/shared/Skeleton';

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

    const { state, dispatch } = useStyleMixContext()
    const onCreateMix = useCallback(() => {
        const imageMix: ImageMix = {
            img: styleMix.content,
            settings: defaultSettings,
            isLoading: false,
        }
        dispatch({ type: 'addMix', id: styleMix.id, payload: imageMix })
    }, [defaultSettings, styleMix])

    return (
        <div className={'StyleMixerRedactor0 ' + className}>
            <div className='StyleMixerRedactor'>
                <div className='StyleMixerRedactorImgs'>
                    <Image src={styleMix.content} size={200} border={8} open/>
                    <button
                        className='StyleMixerRedactorBtn'
                        onClick={onCreateMix}
                    >
                        <img src={Plus}/>
                    </button>
                    <Image src={styleMix.style} size={200} border={8} open/>
                </div>
                <StyleMixerSettings settings={defaultSettings} />
            </div> 
            <div className='StyleMixerRedactorViews'>
                {styleMix.mix.map((mix, i) => (
                    mix.isLoading ?
                        <div className='StyleMixerViewer' key={i}>
                            <Skeleton width={65} height={27} border='8px' />
                            <Skeleton width={120} height={120} border='8px' />
                            <StyleMixerSettings disabled settings={mix.settings} direction='column' />
                        </div> :
                        <StyleMixerViewer imageMix={mix} key={i}/>)
                )}
            </div>
        </div>
    );
});
