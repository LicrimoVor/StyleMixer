import { FC, memo, useCallback, useState, } from 'react';

import './StyleMixerViewer.css';
import { useImageMixContext } from '@/stores/context/styleMixer';
import { StyleMix, MixSettings } from '@/entities/StyleMixer';
import { createStyleMix } from '@/api/styleMix';

interface StyleMixerViewerProps {
    className?: string,
    styleMix: StyleMix,
    defaultSettings: MixSettings
};

/** Отображение и взаимодействие со StyleMixer'ом */
export const StyleMixerViewer: FC <StyleMixerViewerProps> = memo((
    props: StyleMixerViewerProps
) => {
    const {
        className,
        styleMix,
    } = props;

    const [isLoadinge, setIsLoading] = useState(true);
    const { state, dispatch } = useImageMixContext()
    const createStyleMixBtn = useCallback(() => {
        // setIsLoading
        // createStyleMix().then(() => ());
    }, [])

    return (
        <div className='StyleMixerViewer'>
            <img src={imageMix.content} className='ImageEditableImg'/>
        </div>
    );
});
