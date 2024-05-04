import React, { FC, useEffect } from 'react'
import './manualModePage.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { fetchRecomendedBonds } from '../../../entites/recomendedBonds'
import { Recomendations } from '../../../widgets/recomendations'
import { Catalog } from '../../../widgets/catalog'

export const ManualModePage: FC = () => {
    const recomendedBonds = useTypedSelector(
        (state) => state.recomendedBonds.recomendedBonds
    )
    const isLoading = useTypedSelector(
        (state) => state.recomendedBonds.isLoading
    )
    // const error = useTypedSelector((state) => state.recomendedBonds.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRecomendedBonds({}))
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
