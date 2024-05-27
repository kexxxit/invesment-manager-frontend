import React, { FC, useEffect, useState } from 'react'
import './notification.scss'
import Cross from '../../../shared/assets/icons/cross.svg'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { setNotificationIsViewed } from '../../../entites/notifications'

export const Notification: FC = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { lastNotification, isViewed } = useTypedSelector(
        (state) => state.notifications
    )
    const dispatch = useAppDispatch()

    const handleClose = async () => {
        setIsVisible(false)
    }

    useEffect(() => {
        if (lastNotification && !isViewed) {
            setIsVisible(true) 
            dispatch(setNotificationIsViewed())
            console.log(isViewed)
        }
    }, [lastNotification])

    return isVisible ? (
        <div className='notification'>
            <h2 className='notification__title'>{lastNotification?.title}</h2>
            <p className='notification__message'>{lastNotification?.message}</p>
            <button
                className='notification__close-button'
                onClick={handleClose}>
                <img
                    className='notification__close-button__image'
                    src={Cross}
                    alt={Cross}
                />
            </button>
        </div>
    ) : null
}
