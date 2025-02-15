import { FC, memo, useCallback, useState, } from 'react'

import Plus from '@/assets/plus.png'
import Trash from '@/assets/trash.png'
import { useStyleMixContext } from '@/stores/context/styleMixer'
import { Image } from '@/components/shared/Image'
import { StyleSettings } from '@/entities/StyleSettings'
import { ImageMix, StyleMix } from '@/entities/StyleMixer'
import { createImageMix } from '@/api/createImageMix'
import { deleteStyleMix } from '@/api/delStyleMixs'

import { StyleMixerViewer } from '../../StyleMixerViewer'
import { StyleMixerSettings } from '../../StyleMixerSettings'
import { useInitRedactor } from '../libs/useIntitRedactor'
import './StyleMixerRedactor.css'


interface StyleMixerRedactorProps {
    className?: string,
    defaultSettings: StyleSettings,
    styleMix: StyleMix,
}


/** Редактирование и создание новых styleMix */
export const StyleMixerRedactor: FC <StyleMixerRedactorProps> = memo((
    props: StyleMixerRedactorProps
) => {
    const {
        className = '',
        defaultSettings,
        styleMix,
    } = props

    const [settings, setSettings] = useState<StyleSettings>(defaultSettings)
    const { dispatch } = useStyleMixContext()
    const { isLoading, setIsLoading} = useInitRedactor(styleMix, settings)

    const onCreateMix = useCallback(() => {
        if (isLoading || !styleMix.id_api) return

        setIsLoading(true)
        createImageMix({ id_api: styleMix.id_api, settings })
            .then((value) => {
                const imageMix: ImageMix = {
                    id: -1,
                    img: value.data.img,
                    settings: value.data.settings,
                    isLoading: false,
                }
                setIsLoading(false)
                dispatch({ type: 'addMix', id: styleMix.id, payload: imageMix })
            }).catch((reason) => {
                setIsLoading(false)
                const error = reason.message
                const imageMix = {
                    settings,
                    error,
                    isLoading: false,
                }
                dispatch({ type: 'addMix', id: styleMix.id, payload: imageMix })
        })
    }, [settings, styleMix, dispatch, setIsLoading, isLoading])

    const onDelete = useCallback(() => {
        if (!styleMix.id_api) {
            dispatch({ type: 'delete', id: styleMix.id })
            return
        }

        deleteStyleMix(styleMix.id_api)
            .then(() => {
                dispatch({type: 'delete', id: styleMix.id})
            })
    }, [dispatch, styleMix])


    return (
        <div className={'StyleMixerRedactorRoot ' + className}>
            <div className='StyleMixerRedactor'>
                <div className='StyleMixerRedactorHead'>
                    <button className='StyleMixerRedactorDelete' onClick={onDelete}>
                        <Image src={Trash} size={32}/>
                    </button>
                    <h3 className='StyleMixerRedactorTitle'>№ {styleMix.id}</h3>
                </div>
                <div className='StyleMixerRedactorImgs'>
                    <Image src={styleMix.content} size={150} border={8} open/>
                    <button
                        className='StyleMixerRedactorBtn'
                        onClick={onCreateMix}
                    >
                        <img src={Plus}/>
                    </button>
                    <Image src={styleMix.style} size={150} border={8} open/>
                </div>
                <StyleMixerSettings settings={settings} onChange={setSettings} directionMenu='up'/>
            </div>
            <div className='StyleMixerRedactorViews'>
                {styleMix.mixs.map((mix, i) => <StyleMixerViewer imageMix={mix} key={i} />)}
                {isLoading && <StyleMixerViewer imageMix={{id: styleMix.mixs.length, isLoading: true, settings}} />}
            </div>
        </div>
    )
})
