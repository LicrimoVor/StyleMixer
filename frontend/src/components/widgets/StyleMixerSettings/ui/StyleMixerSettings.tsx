import { FC, memo, } from 'react';


import './StyleMixerSettings.css';
import { MixSettings } from '@/entities/StyleMixer';

interface StyleMixerSettingsProps {
    className?: string,
    settings: MixSettings,
    onChange: (settings: MixSettings) => void,
};

/** Настройки для стилизации */
export const StyleMixerSettings: FC <StyleMixerSettingsProps> = memo((
    props: StyleMixerSettingsProps
) => {
    const {
        className,
        settings,
        onChange,
    } = props;

    return (
        <div className={'StyleMixerSettings '+ className}>
            test
        </div>
    );
});
