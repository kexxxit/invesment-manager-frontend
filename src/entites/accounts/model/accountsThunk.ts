import { createAsyncThunk } from '@reduxjs/toolkit'
import { AccountBalance, ErrorType, IAccount, RejectedDataType } from '../../../shared/types'
import { getAccounts, getSandboxAccounts } from '../../../shared/api/accounts'
import { getBalance } from '../../../shared/api/getBalance'

export const getAccountsThunk = createAsyncThunk<
    { accounts: IAccount[] },
    void,
    { readonly rejectValue: RejectedDataType }
>('accounts', async (_, thunkAPI) => {
    try {
        const response = await getAccounts()
        thunkAPI.dispatch(getSandboxAccountsThunk())
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const getSandboxAccountsThunk = createAsyncThunk<
    { accounts: IAccount[] },
    void,
    { readonly rejectValue: RejectedDataType }
>('sandbox/accounts', async (_, thunkAPI) => {
    try {
        const response = await getSandboxAccounts()
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const getAccountBalanceThunk = createAsyncThunk<
    AccountBalance,
    string,
    { readonly rejectValue: RejectedDataType }
>('balance', async (data, thunkAPI) => {
    try {
        const response = await getBalance(data)
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})