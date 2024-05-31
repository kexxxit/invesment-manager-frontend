import { createAsyncThunk } from '@reduxjs/toolkit'
import { ErrorType, IPortfolio, RejectedDataType } from '../../../shared/types'
import { getPortfolio } from '../../../shared/api/getPortfolio'

export const fetchPortfolio = createAsyncThunk<
    IPortfolio,
    string,
    { readonly rejectValue: RejectedDataType }
>('portfolio', async (accountId, thunkAPI) => {
    try {
        const response = await getPortfolio(accountId)
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
