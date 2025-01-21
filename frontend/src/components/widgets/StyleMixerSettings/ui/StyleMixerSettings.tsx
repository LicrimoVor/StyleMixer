import { FC, memo, useCallback, useState, } from 'react';


import './StyleMixerSettings.css';
import { Size, StyleSettings } from '@/entities/StyleSettings';
import { ListBox } from '@/components/shared/ListBox';
import { Model } from '@/entities/StyleSettings';
import { Popover } from '@/components/shared/Popover';
import { Slider } from '@/components/shared/Slider';

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
        className,
        direction = 'row',
        directionMenu,
        settings,
        onChange,
        disabled,
    } = props;

    const [alpha, setAlpha] = useState(settings.alpha);

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
                    data={DataSizes}
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
