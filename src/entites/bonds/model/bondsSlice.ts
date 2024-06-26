import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBond, IBondsQueryParams } from '../../../shared/types'
import { fetchBonds } from './bondsThunk'
import { BONDS_QUANTITY_PER_PAGE } from '../../../shared/consts'

interface IPagination {
    currentPage: number
    totalPages: number
}

interface IBondsState {
    bonds: IBond[]
    currentPageBonds: IBond[]
    pagination: IPagination
    isLoading: boolean
    queryParams: IBondsQueryParams
    error: string | null
}

const initialState: IBondsState = {
    bonds: [],
    currentPageBonds: [],
    pagination: {
        currentPage: 1,
        totalPages: 0,
    },
    queryParams: {
        search: undefined,
        riskLevel: undefined,
        sector: undefined,
        sortBy: undefined,
    },
    isLoading: false,
    error: null,
}

const bondsSlice = createSlice({
    name: 'bonds',
    initialState,
    reducers: {
        setTotalPagesAction: (state, action: PayloadAction<number>) => {
            state.pagination.totalPages = action.payload
        },
        setCurrentPageAction: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload
            if (action.payload < 1) {
                action.payload = 1
            } else if (action.payload > state.pagination.totalPages) {
                action.payload = state.pagination.totalPages
            }
            state.currentPageBonds = state.bonds.slice(
                (action.payload - 1) * BONDS_QUANTITY_PER_PAGE,
                action.payload * BONDS_QUANTITY_PER_PAGE
            )
        },
        setSortByAction: (state, action: PayloadAction<string | undefined>) => {
            state.queryParams = {
                ...state.queryParams,
                sortBy: action.payload,
            }
        },
        setRiskLevelAction: (
            state,
            action: PayloadAction<number | undefined>
        ) => {
            state.queryParams = {
                ...state.queryParams,
                riskLevel: action.payload,
            }
        },
        setSectorAction: (state, action: PayloadAction<string | undefined>) => {
            state.queryParams = {
                ...state.queryParams,
                sector: action.payload,
            }
        },
        setSearchAction: (state, action: PayloadAction<string | undefined>) => {
            state.queryParams = {
                ...state.queryParams,
                search: action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBonds.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBonds.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.bonds = action.payload
                state.bonds = action.payload
                state.pagination.currentPage = 1
                state.currentPageBonds = action.payload.slice(
                    (state.pagination.currentPage - 1) *
                        BONDS_QUANTITY_PER_PAGE,
                    state.pagination.currentPage * BONDS_QUANTITY_PER_PAGE
                )
            })
            .addCase(fetchBonds.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message ?? 'Unknown error'
            })
    },
})

export const {
    setTotalPagesAction,
    setCurrentPageAction,
    setSortByAction,
    setRiskLevelAction,
    setSearchAction,
    setSectorAction,
} = bondsSlice.actions

export default bondsSlice.reducer
