import { FC } from 'react';

import { ImageUploaderBtn } from '@/components/shared/ImageUploader';
import { Image } from '@/components/shared/Image';


interface ImageEditableProps {
    image: string,
    callback: (file: File) => void,
}

/**  */
export const ImageEditable: FC<ImageEditableProps> = ((props: ImageEditableProps) => {
    const {
        image,
        callback,
    } = props


    return (
        <div>
            <Image src={image} size={250} border={8}/>
            <ImageUploaderBtn callback={callback} label='Изменить'/>
        </div>
    )
})
