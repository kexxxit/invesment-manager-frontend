import { createSlice } from '@reduxjs/toolkit'
import { IBond, RejectedDataType } from '../../../shared/types'
import { fetchRecomendedBonds } from './recomendedBondsThunk'

export interface IRecomendenBondsState {
    /** List of bonds. */
    readonly recomendedBonds: IBond[]
    /** Data loading indicator. */
    readonly isLoading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}

const initialState: IRecomendenBondsState = {
    recomendedBonds: [],
    isLoading: true,
    error: null
}

const recomendedBondsSlice = createSlice({
    name: 'recomendedBonds',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchRecomendedBonds.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchRecomendedBonds.fulfilled, (state, action) => {
                state.recomendedBonds = [...action.payload]
                state.isLoading = false
                state.error = null
            })
            .addCase(fetchRecomendedBonds.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? null
            }),
})

// export const {  } = recomendedBondsSlice.actions
export default recomendedBondsSlice.reducer
