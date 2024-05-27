import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    ErrorType,
    IBond,
    IBondEvent,
    IOrderRequest,
    IOrderResponse,
    RejectedDataType,
} from '../../../shared/types'
import { getBondById, placeOrder } from '../../../shared/api/bonds'
import { getBondEvents } from '../../../shared/api/bonds/getBondEvents'
import { getTradingStatus } from '../../../shared/api/exchange'

interface IBondPage {
    bond: IBond
    bondEvents: IBondEvent[]
}

export const fetchBondPage = createAsyncThunk<
    IBondPage,
    string,
    { readonly rejectValue: RejectedDataType }
>('bonds/fetchBond', async (bondId, thunkAPI) => {
    try {
        const bond = await getBondById(bondId)
        const bondEvents = await getBondEvents(bondId)
        const bondPage: IBondPage = {
            bond,
            bondEvents,
        }
        return bondPage
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const postOrder = createAsyncThunk<
    IOrderResponse,
    IOrderRequest,
    { readonly rejectValue: RejectedDataType }
>('bonds/order', async (orderRequest, thunkAPI) => {
    try {
        const order = await placeOrder(orderRequest)
        return order
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const getTradingStatusThunk = createAsyncThunk<
    boolean,
    void,
    { readonly rejectValue: RejectedDataType }
>('tradingStatus', async (_, thunkAPI) => {
    try {
        return await getTradingStatus()
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
