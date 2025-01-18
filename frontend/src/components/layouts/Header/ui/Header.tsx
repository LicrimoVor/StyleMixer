import { FC, memo, } from 'react';

import'./Header.css';

interface HeaderProps {
    className?: string,
};

/** Шапка сайта */
export const Header: FC <HeaderProps> = memo((
    props: HeaderProps
) => {
    const {
        className='',
    } = props;

    return (
        <div className={'Header ' + className}>
            <h1 className='title'>StyleMixer - LicrimoVor project</h1>
        </div>
    );
});
