import { FC, memo, useCallback, useMemo, } from 'react';
import {useDropzone} from 'react-dropzone'

import upload from '@/assets/upload.png';
import download from '@/assets/download.png';
import  './ImageUploaderBtn.css';

interface ImageUploaderBtnProps {
    className?: string,
    disabled?: boolean,
    label?: string,
    callback?: (file: File) => void;
};

/** Другая реализация загрузки изображения в виде кнопки */
export const ImageUploaderBtn: FC<ImageUploaderBtnProps> = memo((
    props: ImageUploaderBtnProps
) => {
    const {
        className = '',
        label = ' ',
        disabled=false,
        callback,
    } = props;

    const onDrop = useCallback<(acceptedFiles: File[]) => void>(acceptedFiles => {
        if (acceptedFiles[0].type != 'image/png' && acceptedFiles[0].type != 'image/jpg') {
            return;
        }

        if (callback) {
            callback(acceptedFiles[0])
        }
    }, [callback])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 })
    const mod = useMemo(() =>
        className + ' ImageUploaderBtn' + (isDragActive ? ' isDragging' : '') + (disabled ? ' disabled' : ''),
        [isDragActive]
    )
    
    return (
        <div className={mod}  {...getRootProps()}>
            <input {...getInputProps()} disabled={disabled} />
            <img src={isDragActive ? download : upload} className='ImageUploaderBtnImage' />
            <p>{label}</p>
        </div>
    )
});
