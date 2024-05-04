import { createAsyncThunk } from '@reduxjs/toolkit'
import { ErrorType, IBond, RejectedDataType } from '../../../shared/types'
import {
    getRecomendedBonds,
} from '../../../shared/api/recomendedBonds'

interface IFetchBondsList {}

export const fetchRecomendedBonds = createAsyncThunk<
    IBond[],
    IFetchBondsList,
    { readonly rejectValue: RejectedDataType }
>('bonds/recomended', async (_, thunkAPI) => {
    try {
        const response = await getRecomendedBonds()
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
