import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBond, IBondsQueryParams } from '../../../shared/types'
import { setTotalPagesAction } from './bondsSlice'
import { getBonds } from '../../../shared/api/bonds'
import { BONDS_QUANTITY_PER_PAGE } from '../../../shared/consts'

export const fetchBonds = createAsyncThunk<IBond[], IBondsQueryParams>(
    'bonds/fetchBonds',
    async (params, thunkAPI) => {
        try {
            const response = await getBonds(
                params.search,
                params.riskLevel,
                params.sector,
                params.sortBy
            )
            const bonds = response
            const totalPages = Math.ceil(bonds.length / BONDS_QUANTITY_PER_PAGE)
            thunkAPI.dispatch(setTotalPages(totalPages))
            return bonds
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch bonds')
        }
    }
)

export const setTotalPages = createAsyncThunk<void, number>(
    'bonds/setTotalPages',
    (totalPages, thunkAPI) => {
        thunkAPI.dispatch(setTotalPagesAction(totalPages))
    }
)

// export const setCurrentPage = createAsyncThunk<void, IBond[]>(
//     'bonds/setCurrentPageBonds',
//     (bonds, thunkAPI) => {
//         thunkAPI.dispatch(setCurrentPageBondsAction(bonds))
//     }
// )
