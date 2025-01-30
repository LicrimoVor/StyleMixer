import { FC, memo, useCallback, } from 'react';

import { useGeneralContext } from '@/stores/context/general';

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

    const { dispatch } = useGeneralContext();

    const onSetAdmin = useCallback(() => {
        dispatch({type: 'setAdmin'})
    }, [dispatch])

    return (
        <div className={'Header ' + className}>
            <h1 className='title'>StyleMixer - <a className='title' onClick={onSetAdmin}>LicrimoVor</a> project</h1>
            <p className='viability'>{viability}</p>
        </div>
    );
});
