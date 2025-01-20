import { ReactNode, useEffect, useState } from 'react';
import {Listbox as HListbox } from '@headlessui/react'

import './ListBox.css';
import { typedMemo } from '@/utils/typedMemo';

interface ListBoxItem<T extends string> {
    value: T,
    component?: ReactNode,
    readonly?: boolean,
    content?: string,
}

interface ListBoxProps<T extends string> {
    className?: string,
    rootClassName?: string,
    data: ListBoxItem<T>[],
    selectedValue?: T,
    defaultValue?: T,
    readonly?: boolean,
    direction?: 'bottom' | 'up',
    label?: string,
    textBtn?: string,
    onChange: (value: T) => void,
}

/**
 * Всплывающее окно с выбором
 */
export const ListBox = typedMemo(<T extends string>(props: ListBoxProps<T>) => {
    const {
        className = '',
        rootClassName='',
        data,
        readonly,
        defaultValue,
        label,
        selectedValue = defaultValue || data[0],
        textBtn,
        direction = 'bottom',
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
                    className={'ListBoxMenu ' + direction}
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
