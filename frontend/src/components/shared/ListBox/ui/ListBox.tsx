import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import {Listbox as HListbox, } from '@headlessui/react'

import './ListBox.css';

interface ListBoxItem {
    value: any,
    component?: ReactNode,
    readonly?: boolean,
    content?: string,
}

interface ListBoxProps {
    className?: string,
    rootClassName?: string,
    data: ListBoxItem[],
    selectedValue?: any,
    defaultValue?: any,
    readonly?: boolean,
    label?: string,
    textBtn?: string,
    onChange: (value: any) => void,
}

/**
 * Всплывающее окно с выбором
 */
export const ListBox = memo((props: ListBoxProps) => {
    const {
        className = '',
        rootClassName='',
        data,
        readonly,
        defaultValue,
        label,
        selectedValue = defaultValue || data[0],
        textBtn,
        onChange,
    } = props;

    const [textButton, setTextButton] = useState(textBtn);
    useEffect(() => {
        if (textBtn === undefined) {
            const content = data.find((item) => item.value === selectedValue)?.content;
            setTextButton(content);
        }
    }, [selectedValue, textButton, data, textBtn]);
    useEffect(() => {
        setTextButton(textBtn);
    }, [textBtn, setTextButton])

    return (
        <div className={rootClassName}>
            {label && <p>{label}</p>}
            <HListbox
                as="div"
                value={selectedValue}
                onChange={onChange}
                className={'ListBox ' + className}
                disabled={readonly}
            >
                <HListbox.Button className={'ListBoxBtn ' + (readonly? 'ReadOnly ' : '')}>
                    {textButton}
                </HListbox.Button>
                <HListbox.Options
                    className={'ListBoxMenu'}
                >
                    {data.map((item) => (
                        <HListbox.Option
                            key={item.value}
                            className={({ active, selected }) => (
                                'Item' + ' ' +
                                (active ? 'Activated ' : '') +
                                (selected ? 'Selected ' : '') +
                                (item.readonly ? 'ReadOnly ' : '')
                            )}
                            value={item.value}
                            disabled={item.readonly}
                        >
                            {item.content || item.component || item.value}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </div>
    );
});
