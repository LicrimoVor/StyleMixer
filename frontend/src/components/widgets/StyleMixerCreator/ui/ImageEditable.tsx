import { FC } from 'react';

import { ImageUploaderBtn } from '@/components/shared/ImageUploader';
import './ImageEditable.css';


interface ImageEditableProps {
    image: string,
    callback: (file: File) => void,
}

//** */
export const ImageEditable: FC<ImageEditableProps> = ((props: ImageEditableProps) => {
    const {
        image,
        callback,
    } = props


    return (
        <div className='ImageEditable'>
            <img src={image} className='ImageEditableImg'/>
            <ImageUploaderBtn callback={callback} label='Изменить'/>
        </div>
    )
})
