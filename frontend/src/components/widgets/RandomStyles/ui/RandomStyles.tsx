import { FC, memo, useCallback, useState, } from 'react';

import { COUNT_RANDOM_STYLES } from '@/config/const';
import { getRandomStyles } from '@/api/getRandomStyles';
import { Image } from '@/components/shared/Image';
import { Popover } from '@/components/shared/Popover';
import { Skeleton } from '@/components/shared/Skeleton';
import { Button } from '@/components/shared/Button';
import { useInitialEffect } from '@/utils/useInitialEffect';

import './RandomStyles.css';


interface RandomStylesProps {
    className?: string,
    setStyle?: (img: string) => void,
};

/** Докстринг */
export const RandomStyles: FC <RandomStylesProps> = memo((
    props: RandomStylesProps
) => {
    const {
        className = '',
        setStyle,
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<string[]>(Array(COUNT_RANDOM_STYLES).fill('0'))

    useInitialEffect(() => {
        onGetRandomStyles()
    })

    const onGetRandomStyles = useCallback(() => {
        setIsLoading(true)
        getRandomStyles(COUNT_RANDOM_STYLES).then(resp => {
                setIsLoading(false)
                setImages(resp.data)
            }
        )
    }, [setImages])

    const onSetStyleHandler = useCallback((index: number) => {
        if (!setStyle) return () => {}
        return () => setStyle(images[index])
    }, [images, setStyle])

    return (
        <div className={'RandomStyles ' + className}>
            <Popover trigger={<Button>Get random styles</Button>} className='RandomStylesPopover'>
                <Button onClick={onGetRandomStyles}>Найти стили</Button>
                <div className='RandomStylesWrapper'>
                    {isLoading ?
                        images.map((val, i) => <Skeleton width={100} key={i} height={100}/>):
                        images.map((src, i) => <Button key={i} onClick={onSetStyleHandler(i)} mode='clear'><Image src={src}  size={100}/></Button>)
                    }
                </div>   
            </Popover>
        </div>
    );
});
