import React, { FC } from 'react'
import { Slider } from '../../../shared/ui/slider/slider'
import './recomendations.scss'
import { RecomendedBond } from '../../../shared/ui/recomendedBond'
import { IBond } from '../../../shared/types'

interface RecomendationsProps {
    readonly recomendedBonds: IBond[]
    readonly isLoading: boolean
}

export const Recomendations: FC<RecomendationsProps> = ({
    recomendedBonds,
    isLoading,
}) => {
    const recomendedBondsComponents = recomendedBonds.map((bond) => (
        <RecomendedBond key={bond.uid} bond={bond} />
    ))

    return (
        <section className='recomendations'>
            <h2 className='recomendations__title'>Рекомендации</h2>
            <Slider
                children={recomendedBondsComponents}
                contentIsLoading={isLoading}
            />
        </section>
    )
}
