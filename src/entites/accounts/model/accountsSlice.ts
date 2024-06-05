import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAccount, RejectedDataType } from '../../../shared/types'
import {
    getAccountBalanceThunk,
    getAccountsThunk,
    getSandboxAccountsThunk,
} from './accountsThunk'
import { IOption } from '../../../shared/ui/dropdown'

export interface IAuthState {
    /** Accounts array. */
    readonly accounts: IAccount[]
    /** Accounts options. */
    readonly accountsOptions: IOption[]
    /** Sandbox accounts array. */
    readonly sandboxAccounts: IAccount[]
    /** Current account. */
    readonly currentAccount?: IAccount
    /** Current account balance. */
    readonly balance: number
    /** Sandbox mode flag. */
    readonly isSandbox: boolean
    /** Data loading indicator. */
    readonly isLoading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}

const initialState: IAuthState = {
    accounts: [],
    accountsOptions: [],
    sandboxAccounts: [],
    isSandbox: false,
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
        },
        toggleSandbox: (state) => {
            state.isSandbox = !state.isSandbox
            state.accountsOptions = (state.isSandbox
                ? state.sandboxAccounts
                : state.accounts).map((account) => ({
                      label: account.name,
                      value: account.id,
                  }))
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
                state.accountsOptions = data.payload.accounts.map(
                    (account) => ({
                        label: account.name,
                        value: account.id,
                    })
                )
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
            .addCase(getSandboxAccountsThunk.fulfilled, (state, data) => {
                state.sandboxAccounts = data.payload.accounts
            })
            .addCase(getAccountBalanceThunk.fulfilled, (state, data) => {
                state.balance = data.payload.balance
            }),
})

export const { setCurrentAccount, toggleSandbox } = accountsSlice.actions
export default accountsSlice.reducer
