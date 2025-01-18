import { FC, memo, } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Header.module.scss';

interface HeaderProps {
    className?: string,
};

/** Докстринг */
export const Header: FC <HeaderProps> = memo((
    props: Header Props
) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(cls.Header, {}, [className])}>
            test
        </div>
    );
});
