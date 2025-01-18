import { FC, memo, useCallback, useState, } from 'react';

import './StyleMixerViewer.css';
import { useStyleMixContext } from '@/stores/context/styleMixer';
import { ImageMix, } from '@/entities/StyleMixer';
import { createStyleMix } from '@/api/styleMix';
import { StyleMixerSettings } from '../../StyleMixerSettings';
import { Image } from '@/components/shared/Image';
import download from '@/assets/download.png';

interface StyleMixerViewerProps {
    className?: string,
    imageMix: ImageMix,
};

/** Отображение styleMix */
export const StyleMixerViewer: FC <StyleMixerViewerProps> = memo((
    props: StyleMixerViewerProps
) => {
    const {
        className = '',
        imageMix,
    } = props;

    const [isLoadinge, setIsLoading] = useState(true);
    const { state, dispatch } = useStyleMixContext()
    const createStyleMixBtn = useCallback(() => {
        // setIsLoading
        // createStyleMix().then(() => ());
    }, [])

    return (
        <div className={'StyleMixerViewer ' + className}>
            <a href={imageMix.img} download='ImageMix' className='StyleMixerViewerDownload'>
                <Image src={download} size={25}/>
            </a>
            <Image src={imageMix.img} size={120} open border={8}/>
            <StyleMixerSettings disabled settings={imageMix.settings} direction='column'/>
        </div>
    );
});
