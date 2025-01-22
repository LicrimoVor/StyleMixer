import { CSSProperties, FC, memo, ReactNode } from 'react';
import {Popover as HPopover} from '@headlessui/react'

import './Popover.css';


interface PopoverProps {
    trigger?: ReactNode,
    children?: ReactNode,
    className?: string,
    direction?: 'bottom' | 'up',
    autoScroll?: boolean,
    height?: string,
}

/**
 * Тот же дроп-даун, но с любым внутренним содержимым
 */
export const Popover: FC<PopoverProps> = memo((props: PopoverProps) => {
    const {
        className,
        children,
        trigger,
        direction = 'bottom',
        autoScroll,
        height,
    } = props;

    const styles: CSSProperties = {
        height,
        overflowY: autoScroll ? 'scroll' : undefined,
    };

    return (
        <HPopover className={'Popover ' + className}>
            <HPopover.Button as="div">
                {trigger}
            </HPopover.Button>
            <HPopover.Panel
                style={styles}
                className={'PopoverMenu ' + direction}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
