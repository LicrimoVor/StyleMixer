import { FC, memo, useCallback, useState } from 'react';
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

};

/** Загрузка изображения */
export const Slider: FC<SliderProps> = memo((
    props: SliderProps
) => {
    const {
        className = '',
        // onChange,
        onChangeComplete,
    } = props;

    const [val, setVal] = useState([0, 1])

    const onChange = useCallback((val_: number[]) => {
        if (val_[0] - val[0] > 0.005) setVal([val_[0], 1-val_[0]])
        else setVal([1-val_[1], val_[1]])
    }, [setVal]) 

    
    return (
        <div className={'Slider ' + className}>
            {val[0] + "  " + val[1]}
            <RcSlider
                value={val}
                range
                min={0}
                max={1}
                step={0.01}
                onChange={onChange}
                // onChangeComplete={onChangeComplete}
            />
        </div>
    )
});
