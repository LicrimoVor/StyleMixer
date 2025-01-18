import { FC, memo, useCallback, useEffect, useState, } from 'react';

import { ImageUploader, ImageUploaderBtn } from '@/components/ui/ImageUploader';
import Plus from '@/assets/plus.png';
import './StyleMixerCreator.css';
import { ImageEditable } from './ImageEditable';


interface StyleMixerCreatorProps {
    className?: string,
    callback?: (content: File, style: File) => void,
    refresh?: boolean,
};


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
    const onSaveHandler = useCallback(() => {
        if (!style || !content || !callback) return;
        callback(content, style)
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

            <button
                className={'StyleMixerCreatorBtn ' + (style && content ? 'Ready' : 'notReady')}
                onClick={onSaveHandler}
            >
                <img src={Plus}/>
            </button>

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
