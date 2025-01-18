import { FC, memo, useCallback, useMemo, } from 'react';
import {useDropzone} from 'react-dropzone'

import upload from '@/assets/upload.png';
import download from '@/assets/download.png';
import  './ImageUploader.css';

interface ImageProps {
    className?: string,
    label?: string,
    callback?: (file: File) => void;
};

/** Отображение фотографии */
export const Image: FC<ImageProps> = memo((
    props: ImageProps
) => {
    const {
        className='',
        label = ' ',
        callback,
    } = props;

    const onDrop = useCallback<(acceptedFiles: File[]) => void>(acceptedFiles => {
        if (callback) {
            callback(acceptedFiles[0])
        }
    }, [callback])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 })
    const mod = useMemo(() => className + ' ImageUploader' + (isDragActive ? ' isDragging' : ''),
        [isDragActive])
    return (
        <div className={mod}  {...getRootProps()}>
            <input {...getInputProps()} />
            <img src={isDragActive ? download : upload} className='ImageUploaderImage' />
            <p>{isDragActive ? 'Отправить' : 'Загрузить'}</p>
            <p>{label}</p>
        </div>
    )
});
