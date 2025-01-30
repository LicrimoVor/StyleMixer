import { FC, memo, ReactNode, } from 'react';

import './Button.css';

interface ButtonProps {
    className?: string,
    children?: ReactNode,
    disabled?: boolean,
    mode?:'normal' | 'clear',
    onClick?: () => void,
};

/** Кнопочка */
export const Button: FC <ButtonProps> = memo((
    props: ButtonProps
) => {
    const {
        className = '',
        children,
        disabled,
        mode='normal',
        onClick,
    } = props;

    return (
        <button
            onClick={onClick}
            className={mode + ' Button '  + className + (disabled ? ' disabled' : '')}
        >
            {children}
        </button>
    );
});
