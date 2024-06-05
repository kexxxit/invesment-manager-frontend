import { createAsyncThunk } from '@reduxjs/toolkit'
import { ErrorType, IPortfolio, RejectedDataType } from '../../../shared/types'
import {
    getPortfolio,
    getSandboxPortfolio,
} from '../../../shared/api/getPortfolio'

export const fetchPortfolio = createAsyncThunk<
    IPortfolio,
    { accontId: string; isSandbox: boolean },
    { readonly rejectValue: RejectedDataType }
>('portfolio', async (data, thunkAPI) => {
    try {
        const response = data.isSandbox
            ? await getSandboxPortfolio(data.accontId)
            : await getPortfolio(data.accontId)
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
