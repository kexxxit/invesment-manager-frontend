import { createSlice } from '@reduxjs/toolkit'
import { IPosition, RejectedDataType } from '../../../shared/types'
import { fetchPortfolio } from './portfolioThunk'

interface IPortfolioState {
    totalAmountBonds: number,
    positions: IPosition[],
    isLoading: boolean,
    error: RejectedDataType | null
}

const initialState: IPortfolioState = {
    totalAmountBonds: 0,
    positions: [],
    isLoading: false,
    error: null
}

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchPortfolio.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchPortfolio.fulfilled, (state, action) => {
                state.positions = action.payload.positions
                state.totalAmountBonds = action.payload.totalAmountBonds
                state.isLoading = false
                state.error = null
            })
            .addCase(fetchPortfolio.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? null
            }),
})

// export const {  } = recomendedBondsSlice.actions
export default portfolioSlice.reducer
