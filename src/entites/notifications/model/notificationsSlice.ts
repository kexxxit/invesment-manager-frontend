import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INotification } from '../../../shared/types'

interface INotificationsState {
    /** Notificatios array. */
    notifications: INotification[]
    /** Last created notification. */
    lastNotification: INotification | null
    /** Notification has been viewed flag. */
    isViewed: boolean
}

const initialState: INotificationsState = {
    notifications: [],
    lastNotification: null,
    isViewed: true
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<INotification>) => {
            state.lastNotification = action.payload
            state.notifications.push(action.payload)
            state.isViewed = false
        },
        setNotificationIsViewed: (state) => {
            state.isViewed = true
        }
    },
})

export const { setNotification, setNotificationIsViewed } = notificationsSlice.actions

export default notificationsSlice.reducer
