import { FC, memo, useCallback, } from 'react';

import  './Image.css';
import { openImage } from '../lib/openImage';

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

    return <img
        className={'_img ' + (open? '_img_open ': '') + className}
        src={src}
        style={{ width: size, height: size, borderRadius: border }}
        onClick={onOpenImg}
    />
});
