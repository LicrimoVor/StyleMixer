import { FC, memo, } from 'react';

import'./Header.css';

interface HeaderProps {
    className?: string,
    viability?: string,
};

/** Шапка сайта */
export const Header: FC <HeaderProps> = memo((
    props: HeaderProps
) => {
    const {
        className = '',
        viability='',
    } = props;

    return (
        <div className={'Header ' + className}>
            <h1 className='title'>StyleMixer - LicrimoVor project</h1>
            <p className='viability'>{viability}</p>
        </div>
    );
});
