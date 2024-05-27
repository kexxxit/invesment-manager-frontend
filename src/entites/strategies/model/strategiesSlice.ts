import { createSlice } from '@reduxjs/toolkit'
import { IStrategy, IStrategyListItem, RejectedDataType } from '../../../shared/types'
import { fetchStrategies } from './strategiesThunk'

export interface IRecomendenBondsState {
    /** List of strategies. */
    readonly strategies: IStrategy[]
    /** Data loading indicator. */
    readonly isLoading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}

const initialState: IRecomendenBondsState = {
    strategies: [],
    isLoading: false,
    error: null
}

const strategiesSlice = createSlice({
    name: 'strategies',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchStrategies.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchStrategies.fulfilled, (state, action) => {
                state.strategies = action.payload
                state.isLoading = false
                state.error = null
            })
            .addCase(fetchStrategies.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? null
            }),
})

// export const {  } = recomendedBondsSlice.actions
export default strategiesSlice.reducer
