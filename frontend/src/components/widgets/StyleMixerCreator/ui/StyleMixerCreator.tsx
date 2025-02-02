import { FC, memo, useCallback, useEffect, useState, } from 'react';

import { ImageUploader, ImageUploaderBtn } from '@/components/shared/ImageUploader';
import { Image } from '@/components/shared/Image';
import Plus from '@/assets/plus.png';
import { StyleSettings } from '@/entities/StyleSettings';
import { DefaultStyleSettings } from '@/config/const';

import { StyleMixerSettings } from '../../StyleMixerSettings';
import './StyleMixerCreator.css';

interface StyleMixerCreatorProps {
    className?: string,
    callback?: (content: File | string, style: File | string, settings: StyleSettings) => void,
    style?: File|string,
    refresh?: boolean,
};


const ImageEditable = memo(({ image, callback }: {image: string, callback: (file: File) => void}) => (
        <div className='StyleMixerCreatorEditor'>
            <Image src={image} size={250} border={8}/>
            <ImageUploaderBtn callback={callback} label='Изменить'/>
        </div>
))

const ImageSrc = (img: File | string) => {
    if (typeof img === 'string') return img
    return URL.createObjectURL(img)
}


/** Панель изменения стиля изображения */
export const StyleMixerCreator: FC <StyleMixerCreatorProps> = memo((
    props: StyleMixerCreatorProps
) => {
    const {
        className = '',
        callback,
        style: default_style,
        refresh
    } = props;
    const [style, setStyle] = useState<File|string>();
    const [content, setContent] = useState<File|string>();
    const [settings, setSettings] = useState<StyleSettings>(DefaultStyleSettings);

    useEffect(() => {
        setStyle(undefined)
        setContent(undefined)
    }, [refresh])

    useEffect(() => {
        setStyle(default_style)
    }, [default_style])

    const callbackStyle = useCallback((file: File) => {
        setStyle(file)
    }, [setStyle])
    const callbackContent = useCallback((file: File) => {
        setContent(file)
    }, [setContent])

    const onCreateHandler = useCallback(() => {
        if (!style || !content || !callback) return;
        callback(content, style, settings)
    }, [style, content, settings, callback])
    
    return (
        <div className={className + ' StyleMixerCreator'}>
            <div className='StyleMixerCreatorUpload'>
                <h3 className='StyleMixerCreatorTitle'>Content</h3>
                {content ?
                    <ImageEditable image={ImageSrc(content)} callback={callbackContent}/> :
                    <div className='StyleMixerCreatorEditor'>
                        <ImageUploader label='content' callback={callbackContent} />
                        <ImageUploaderBtn disabled label='Изменить'/>
                    </div>
                }
            </div>
            <div className='StyleMixerCreatorMenu'>
                <StyleMixerSettings
                    direction='column'
                    settings={settings}
                    onChange={setSettings}
                />
                <button
                    className={'StyleMixerCreatorBtn ' + (style && content ? 'Ready' : 'notReady')}
                    onClick={onCreateHandler}
                >
                    <img src={Plus}/>
                </button>
            </div>
            <div className='StyleMixerCreatorUpload'>
                <h3 className='StyleMixerCreatorTitle'>Style</h3>
                {style ?
                    <ImageEditable image={ImageSrc(style)} callback={callbackStyle}/> :
                    <div className='StyleMixerCreatorEditor'>
                        <ImageUploader label='style' callback={callbackStyle} />
                        <ImageUploaderBtn disabled label='Изменить'/>
                    </div>
                }
            </div>
        </div>
    );
});
