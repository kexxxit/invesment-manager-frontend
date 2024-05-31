import { createSlice } from '@reduxjs/toolkit'
import { RejectedDataType } from '../../../shared/types'
import { auth, isAuthMethod, logoutThunk } from './authThunk'

export interface IAuthState {
    /** Authorization flag. */
    readonly isAuth: boolean
    /** Data loading indicator. */
    readonly isLoading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}

const initialState: IAuthState = {
    isAuth: false,
    isLoading: true,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(auth.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(auth.fulfilled, (state, _) => {
                state.isAuth = true
                state.isLoading = false
                state.error = null
            })
            .addCase(auth.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? null
            })
            .addCase(isAuthMethod.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(isAuthMethod.fulfilled, (state, _) => {
                state.isAuth = true
                state.isLoading = false
                state.error = null
            })
            .addCase(isAuthMethod.rejected, (state, action) => {
                state.isAuth = false
                state.isLoading = false
                state.error = action.payload ?? null
            })
            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.isAuth = false
                state.isLoading = false
                state.error = null
            }),
})

// export const {  } = recomendedBondsSlice.actions
export default authSlice.reducer
