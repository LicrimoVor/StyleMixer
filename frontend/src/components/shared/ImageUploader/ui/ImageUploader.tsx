import { FC, memo, useCallback, useMemo, useState, } from 'react';
import {useDropzone} from 'react-dropzone'

import upload from '@/assets/upload.png';
import download from '@/assets/download.png';
import  './ImageUploader.css';

interface ImageUploaderProps {
    className?: string,
    label?: string,
    callback?: (file: File) => void;
};

/** Загрузка изображения */
export const ImageUploader: FC<ImageUploaderProps> = memo((
    props: ImageUploaderProps
) => {
    const {
        className = '',
        label = ' ',
        callback,
    } = props;
    const [isError, setIsError] = useState(false);

    const onDrop = useCallback<(acceptedFiles: File[]) => void>(acceptedFiles => {
        if (acceptedFiles[0].type != 'image/png' && acceptedFiles[0].type != 'image/jpeg') {
            setIsError(true)
            return;
        }

        setIsError(false)
        if (callback) {
            callback(acceptedFiles[0])
        }
    }, [callback, setIsError])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 })


    const mod = useMemo(() =>
        className + ' ImageUploader' + (isDragActive ? ' isDragging' : '') + (isError ? ' isError' : ''),
        [isDragActive, isError]
    )
    
    return (
        <div className={mod}  {...getRootProps()}>
            <input {...getInputProps()} />
            <img src={isDragActive ? download : upload} className='ImageUploaderImage' />
            <p>{isDragActive ? 'Отправить' : 'Загрузить'}</p>
            <p>{label}</p>
        </div>
    )
});
