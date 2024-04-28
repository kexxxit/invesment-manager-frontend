import React, { FC, useEffect } from 'react'
import { Slider } from '../../../shared/ui/slider/slider'
import './manualModePage.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { fetchRecomendedBonds } from '../../../entites/bond'
import { RecomendedBond } from '../../../shared/ui/recomendedBond'


export const ManualModePage: FC = () => {
    const recomendedBonds = useTypedSelector(
        (state) => state.recomendedBonds.recomendedBonds
    )
    const isLoading = useTypedSelector(
        (state) => state.recomendedBonds.isLoading
    )
    const error = useTypedSelector((state) => state.recomendedBonds.error)
    const dispatch = useAppDispatch()

    const recomendedBondsComponents = recomendedBonds.map((bond) => (
        <RecomendedBond key={bond.uid} bond={bond} />
    ))

    useEffect(() => {
        dispatch(fetchRecomendedBonds({}))
    }, [])

    useEffect(() => {
        if (!isLoading) {
            console.log(recomendedBonds)
        }
        if (error) {
            console.log(error)
        }
    }, [isLoading, recomendedBonds, error])

    return (
        <>
            <section className='recomendations'>
                <h2>Рекомендации</h2>
                <Slider children={recomendedBondsComponents} />
            </section>
            <section className='catalog'></section>
        </>
    )
}
