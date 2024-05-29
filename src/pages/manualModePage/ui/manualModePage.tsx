import React, { FC, useEffect } from 'react'
import './manualModePage.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { fetchRecomendedBonds } from '../../../entites/recomendedBonds'
import { Recomendations } from '../../../widgets/recomendations'
import { Catalog } from '../../../widgets/catalog'
import { useNavigate } from 'react-router-dom'

export const ManualModePage: FC = () => {
    const { recomendedBonds, isLoading, error } = useTypedSelector(
        (state) => state.recomendedBonds
    )
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        recomendedBonds.length === 0 && dispatch(fetchRecomendedBonds())
    }, [])

    return (
        <>
            <Recomendations
                recomendedBonds={recomendedBonds}
                isLoading={isLoading}
            />
            <Catalog />
        </>
    )
}
