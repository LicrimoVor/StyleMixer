import { FC, memo, useCallback } from 'react';
import { default as RcSlider } from 'rc-slider';

import './Slider.css';
import 'rc-slider/assets/index.css';

interface SliderProps {
    className?: string,
    label?: string,
    onChange?: (value: number) => void;
    onChangeComplete?: (value: number) => void;
    min?: number
    max?: number,
    step?: number,
    value?: number,
};

/** Загрузка изображения */
export const Slider: FC<SliderProps> = memo((
    props: SliderProps
) => {
    const {
        className = '',
        value,
        max,
        min,
        step,
        onChange,
        onChangeComplete,
    } = props;

    const onChangeWrapper = useCallback((value: number | number[]) => {
        if (!onChange || Array.isArray(value)) return
        else onChange(value);
    }, [onChange])

    const onChangeCompleteWrapper = useCallback((value: number | number[]) => {
        if (!onChangeComplete || Array.isArray(value)) return
        else onChangeComplete(value);
    }, [onChangeComplete])


    return (
        <div className={'Slider ' + className}>
            <RcSlider
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChangeWrapper}
                onChangeComplete={onChangeCompleteWrapper}
            />
        </div>
    )
});
