import { FC, memo, ReactElement } from 'react';


import { ImageMix, } from '@/entities/StyleMixer';
import { Image } from '@/components/shared/Image';
import download from '@/assets/download.png';
import { Skeleton } from '@/components/shared/Skeleton';
import { StyleMixerSettings } from '../../StyleMixerSettings';
import './StyleMixerViewer.css';

interface StyleMixerViewerProps {
    className?: string,
    imageMix: ImageMix,
};

/** Отображение imageMix */
export const StyleMixerViewer: FC <StyleMixerViewerProps> = memo((
    props: StyleMixerViewerProps
) => {
    const {
        className = '',
        imageMix,
    } = props;

    let InnerElement: ReactElement;
    if (imageMix.isLoading) {
        InnerElement = (
            <>
                <Skeleton width={65} height={27} border='8px' />
                <Skeleton width={150} height={150} border='8px' />
            </>
        )
    } else if (imageMix.error) {
        InnerElement = (
            <>
                <div className='StyleMixerViewerBtnError'>
                    <Image src={download} size={25}/>
                </div>
                <div className='StyleMixerViewerError'>
                    <p>{imageMix.error}</p>
                </div>
            </>
        )
    } else {
        InnerElement = (
            <>
                <a href={imageMix.img} download='ImageMix' className='StyleMixerViewerDownload'>
                    <Image src={download} size={25}/>
                </a>
                <Image src={imageMix.img} size={150} open border={8}/>
            </>
        )
    }

    return (
        <div className={'StyleMixerViewer ' + className}>
            <h4 className='StyleMixerViewerTitle'>{imageMix.id+1}</h4>
            {InnerElement}
            <StyleMixerSettings disabled settings={imageMix.settings} direction='column' />
        </div>
    );
});
