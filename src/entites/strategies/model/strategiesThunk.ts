import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    ErrorType,
    IStrategy,
    RejectedDataType,
} from '../../../shared/types'
import { getStrategies } from '../../../shared/api/strategies'

export const fetchStrategies = createAsyncThunk<
    IStrategy[],
    void,
    { readonly rejectValue: RejectedDataType }
>('strategies', async (_, thunkAPI) => {
    try {
        return (await getStrategies()).automatedTasksList
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
