import { FC, memo, useCallback, useMemo, useState, } from 'react';

import { Size, StyleSettings } from '@/entities/StyleSettings';
import { Model } from '@/entities/StyleSettings';
import { ListBox } from '@/components/shared/ListBox';
import { Popover } from '@/components/shared/Popover';
import { Slider } from '@/components/shared/Slider';
import { useGeneralContext } from '@/stores/context/general';

import { DataModels, DataSizes, ListBoxItem } from '../models/settings'
import './StyleMixerSettings.css';


interface StyleMixerSettingsProps {
    className?: string,
    direction?: 'row' | 'column',
    directionMenu?: 'bottom' | 'up',
    settings: StyleSettings,
    disabled?: boolean,
    onChange?: (settings: StyleSettings) => void,
};

const TriggerAlpha = memo(({value, className=''}: {value: number, className?: string}) => (
    <button className={'TriggerAlpha ' + className}>
        {value}
    </button>
))


/** Настройки для стилизации */
export const StyleMixerSettings: FC <StyleMixerSettingsProps> = memo((
    props: StyleMixerSettingsProps
) => {
    const {
        className = '',
        direction = 'row',
        directionMenu,
        settings,
        onChange,
        disabled,
    } = props;

    const [alpha, setAlpha] = useState(settings.alpha);
    const { state } = useGeneralContext();

    const onChangeModel = useCallback((model: Model) => {
        if (!onChange) return
        onChange({...settings, model})
    }, [onChange, settings])
    const onChangeSize = useCallback((size: Size) => {
        if (!onChange) return
        onChange({...settings, size})
    }, [onChange, settings])
    const onChangeAlpha = useCallback((alpha: number) => {
        if (!onChange) return
        onChange({...settings, alpha})
    }, [onChange, settings])

    const dataSizes = useMemo<ListBoxItem<Size>[]>(() => {
        return state.isAdmin? [...DataSizes, { value: '-1' }]: DataSizes
    }, [state])

    return (
        <div style={{flexDirection:direction}} className={'StyleMixerSettings '+ className}>
            <div className='HStack'>
                <p style={{margin: 0}}>m: </p>
                <ListBox<Model>
                    data={DataModels}
                    onChange={onChangeModel}
                    selectedValue={settings.model}
                    textBtn={settings.model}
                    readonly={disabled}
                    rootClassName='SettingsListBox'
                    direction={directionMenu}
                    />
            </div>
            <div className='HStack'>
                <p style={{margin: 0}}>s:</p>
                <ListBox<Size>
                    data={dataSizes}
                    onChange={onChangeSize}
                    selectedValue={settings.size}
                    textBtn={settings.size}
                    readonly={disabled}
                    rootClassName='SettingsListBox'
                    direction={directionMenu}
                />
            </div>
            
            <div className='HStack'>
                <p style={{margin: 0}}>a:</p>
                {disabled ?
                    <TriggerAlpha value={alpha} className='isDisabled'/>:
                    <Popover className='AlphaWrapper' trigger={<TriggerAlpha value={alpha}/>} direction={directionMenu}>
                        <Slider
                            max={1}
                            min={0}
                            value={alpha}
                            step={0.01}
                            className='AlphaSlider'
                            onChange={setAlpha}
                            onChangeComplete={onChangeAlpha}
                            
                        />
                    </Popover>
                }
            </div>
        </div>
    );
});
