import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    ErrorType,
    IStrategy,
    IStrategyRequest,
    RejectedDataType,
} from '../../../shared/types'
import { createStrategy, getStrategies } from '../../../shared/api/strategies'
import { IToggleResponse, toggleStrategy } from '../../../shared/api/toggleStrategy'
import { deleteStrategy } from '../../../shared/api/deleteStrategy'

export const fetchStrategies = createAsyncThunk<
    IStrategy[],
    void,
    { readonly rejectValue: RejectedDataType }
>('strategies', async (_, thunkAPI) => {
    try {
        return (await getStrategies()).automatedTasksList
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const toggleStrategyThunk = createAsyncThunk<
    IToggleResponse,
    string,
    { readonly rejectValue: RejectedDataType }
>('toggleStrategy', async (id, thunkAPI) => {
    try {
        return await toggleStrategy(id)
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const deleteStrategyThunk = createAsyncThunk<
    void,
    string,
    { readonly rejectValue: RejectedDataType }
>('deleteStrategy', async (id, thunkAPI) => {
    try {
        await deleteStrategy(id)
        thunkAPI.dispatch(fetchStrategies())
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

export const createStrategyThunk = createAsyncThunk<
    IStrategy,
    IStrategyRequest,
    { readonly rejectValue: RejectedDataType }
>('createStrategy', async (strategy, thunkAPI) => {
    try {
        const response = await createStrategy(strategy)
        thunkAPI.dispatch(fetchStrategies())
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})

