import { AppDispatch } from '../../../app/store/store'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useThunkDispatch = () =>
    useDispatch<ThunkDispatch<any, any, any>>()
