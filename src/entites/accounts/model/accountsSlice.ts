import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAccount, RejectedDataType } from '../../../shared/types'
import { getAccountBalanceThunk, getAccountsThunk } from './accountsThunk'
import { getBalance } from '../../../shared/api/getBalance'

export interface IAuthState {
    /** Accounts array. */
    readonly accounts: IAccount[]
    /** Current account. */
    readonly currentAccount?: IAccount
    /** Current account balance. */
    readonly balance: number
    /** Data loading indicator. */
    readonly isLoading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}

const initialState: IAuthState = {
    accounts: [],
    currentAccount: undefined,
    balance: 0,
    isLoading: true,
    error: null,
}

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        setCurrentAccount: (state, action: PayloadAction<IAccount>) => {
            state.currentAccount = action.payload
            console.log(action.payload)
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAccountsThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getAccountsThunk.fulfilled, (state, data) => {
                state.accounts = data.payload.accounts
                data.payload.accounts.length > 0
                    ? (state.currentAccount = data.payload.accounts[0])
                    : (state.currentAccount = undefined)
                state.isLoading = false
                state.error = null
            })
            .addCase(getAccountsThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? null
            })
            .addCase(getAccountBalanceThunk.fulfilled, (state, data) => {
                state.balance = data.payload.balance
            })
})

export const { setCurrentAccount } = accountsSlice.actions
export default accountsSlice.reducer
