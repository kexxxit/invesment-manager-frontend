import { createSlice } from '@reduxjs/toolkit'
import { IOrderResponse, RejectedDataType } from '../../../shared/types'
import { getTradingStatusThunk, postOrder } from './bondPageThunk'

interface IOrderState {
    /** Order. */
    order: IOrderResponse | null
    /** Data loading indicator. */
    isOrderLoading: boolean
    /** The flag of the exchange. */
    isTradingEnabled: boolean
    /** Error message. */
    readonly orderError: RejectedDataType | null
}

const initialState: IOrderState = {
    order: null,
    isOrderLoading: false,
    isTradingEnabled: false,
    orderError: null,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.order = null
            state.isOrderLoading = false
            state.orderError = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.isOrderLoading = true
                state.orderError = null
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.isOrderLoading = false
                state.orderError = null
                state.order = action.payload
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.isOrderLoading = false
                state.orderError = action.payload ?? null
            })
            .addCase(getTradingStatusThunk.fulfilled, (state, action) => {
                state.isTradingEnabled = action.payload
            })
    },
})

export const { clearOrder } = orderSlice.actions

export default orderSlice.reducer
