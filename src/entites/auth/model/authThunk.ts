import { createAsyncThunk } from '@reduxjs/toolkit'
import { ErrorType, RejectedDataType } from '../../../shared/types'
import { authorize, isAutorized } from '../../../shared/api/auth'

export const auth = createAsyncThunk<
    {},
    {"Token": string},
    { readonly rejectValue: RejectedDataType }
>('auth', async (req, thunkAPI) => {
    try {
        const response = await authorize(req)
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const isAuthMethod = createAsyncThunk<
    {},
    {},
    { readonly rejectValue: RejectedDataType }
>('isAuth', async (_, thunkAPI) => {
    try {
        const response = await isAutorized()
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
