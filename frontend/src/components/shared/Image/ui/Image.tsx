import { FC, memo, useCallback, } from 'react';

import { openImage } from '../lib/openImage';
import './Image.css';


interface ImageProps {
    className?: string,
    open?: boolean,
    size?: number,
    src?: string,
    border?: number,
};

/** Отображение фотографии */
export const Image: FC<ImageProps> = memo((
    props: ImageProps
) => {
    const {
        className='',
        open = false,
        size = 50,
        border,
        src,
    } = props;

    const onOpenImg = useCallback(() => {
        if (open && src) {
            openImage(src);
        }
    }, [open])

    return (
        <div style={{ width: size, height: size }} className='_img_wrapper'>
            <img
                className={'_img ' + (open? '_img_open ': '') + className}
                src={src}
                style={{ maxWidth: size, maxHeight: size, borderRadius: border }}
                onClick={onOpenImg}
            />
        </div>
    )
});
