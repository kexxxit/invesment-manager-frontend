import { createSlice } from '@reduxjs/toolkit'
import { IBond, IBondEvent, RejectedDataType } from '../../../shared/types'
import { fetchBondPage } from './bondPageThunk'

interface IBondsState {
    /** Bond. */
    bond: IBond | null
    /** List of bond event. */
    bondEvents: IBondEvent[] | null
    /** Data loading indicator. */
    isLoading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}

const initialState: IBondsState = {
    bond: null,
    bondEvents: null,
    isLoading: false,
    error: null,
}

const bondsSlice = createSlice({
    name: 'bondPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBondPage.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBondPage.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.bond = action.payload.bond
                state.bondEvents = action.payload.bondEvents

            })
            .addCase(fetchBondPage.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? null
            })
    },
})

// export const {} = bondsSlice.actions

export default bondsSlice.reducer
