import { FC, memo, useCallback, } from 'react';


import './StyleMixerSettings.css';
import { Size, StyleSettings } from '@/entities/StyleSettings';
import { ListBox } from '@/components/shared/ListBox';
import { Model } from '@/entities/StyleSettings';

const DataModels: Record<'value', Model>[] = [
    { value: 'VGG16' },
    { value: 'VGG19'},
]
const DataSizes: Record<'value', Size>[] = [
    { value: '128' },
    { value: '256' },
    { value: '512' }
]


interface StyleMixerSettingsProps {
    className?: string,
    direction?: 'row'|'column',
    settings: StyleSettings,
    disabled?: boolean,
    onChange?: (settings: StyleSettings) => void,
};

/** Настройки для стилизации */
export const StyleMixerSettings: FC <StyleMixerSettingsProps> = memo((
    props: StyleMixerSettingsProps
) => {
    const {
        className,
        direction='row',
        settings,
        onChange,
        disabled,
    } = props;

    const onChangeModel = useCallback((model: Model) => {
        if (!onChange) return
        onChange({...settings, model})
    }, [onChange, settings])
    const onChangeSize = useCallback((size: Size) => {
        if (!onChange) return
        onChange({...settings, size})
    }, [onChange, settings])

    return (
        <div style={{flexDirection:direction}} className={'StyleMixerSettings '+ className}>
            <ListBox<Model>
                data={DataModels}
                onChange={onChangeModel}
                selectedValue={settings.model}
                textBtn={settings.model}
                readonly={disabled}
                rootClassName='SettingsListBox'
            />
            <ListBox<Size>
                data={DataSizes}
                onChange={onChangeSize}
                selectedValue={settings.size}
                textBtn={settings.size}
                readonly={disabled}
                rootClassName='SettingsListBox'
            />
        </div>
    );
});
