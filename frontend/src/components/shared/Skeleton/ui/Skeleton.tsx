import { CSSProperties, FC, memo } from 'react';

import './Skeleton.css';

interface SkeletonProps {
    className?: string,
    height?: string | number,
    width?: string | number,
    border?: string,
}

/** Предзагрузчик - скелетон */
export const Skeleton: FC<SkeletonProps> = memo((props: SkeletonProps) => {
    const {
        className='',
        height,
        width,
        border,
    } = props;

    const styles: CSSProperties = {
        height,
        width,
        borderRadius: border,
    };

    return (
        <div
            style={styles}
            className={'Skeleton ' + className}
        />
    );
});
