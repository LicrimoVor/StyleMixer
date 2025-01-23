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
    callback?: (content: File, style: File, settings: StyleSettings) => void,
    refresh?: boolean,
};


const ImageEditable = memo(({ image, callback }: {image: string, callback: (file: File) => void}) => (
        <div>
            <Image src={image} size={250} border={8}/>
            <ImageUploaderBtn callback={callback} label='Изменить'/>
        </div>
))


/** Панель изменения стиля изображения */
export const StyleMixerCreator: FC <StyleMixerCreatorProps> = memo((
    props: StyleMixerCreatorProps
) => {
    const {
        className = '',
        callback,
        refresh
    } = props;
    const [style, setStyle] = useState<File>();
    const [content, setContent] = useState<File>();
    const [settings, setSettings] = useState<StyleSettings>(DefaultStyleSettings);

    useEffect(() => {
        setStyle(undefined)
        setContent(undefined)
    }, [refresh])

    const callbackStyle = useCallback((file: File) => {
        setStyle(file)
    }, [setStyle])
    const callbackContent = useCallback((file: File) => {
        setContent(file)
    }, [setContent])

    const onCreateHandler = useCallback(() => {
        if (!style || !content || !callback) return;
        callback(content, style, settings)
    }, [style, content, callback])
    
    return (
        <div className={className + ' StyleMixerCreator'}>
            <div className='StyleMixerCreatorUpload'>
                <h3 className='StyleMixerCreatorTitle'>Content</h3>
                {content ?
                    <ImageEditable image={URL.createObjectURL(content)} callback={callbackContent}/> :
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
                    <ImageEditable image={URL.createObjectURL(style)} callback={callbackStyle}/> :
                    <div className='StyleMixerCreatorEditor'>
                        <ImageUploader label='style' callback={callbackStyle} />
                        <ImageUploaderBtn disabled label='Изменить'/>
                    </div>
                }
            </div>
        </div>
    );
});
