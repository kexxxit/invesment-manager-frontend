import React, { FC } from 'react'
import { Slider } from '../../../shared/ui/slider/slider'
import './recomendations.scss'
import { RecomendedBond } from '../../../shared/ui/recomendedBond'
import { IBond } from '../../../shared/types'
import { useNavigate } from 'react-router-dom'
import { Preloader } from '../../../shared/ui/perloader'

interface RecomendationsProps {
    readonly recomendedBonds: IBond[]
    readonly isLoading: boolean
}

export const Recomendations: FC<RecomendationsProps> = ({
    recomendedBonds,
    isLoading,
}) => {
    const navigate = useNavigate()
    const onRecomendationClick = (id: string) => {
        navigate(id)
    }

    const recomendedBondsComponents = recomendedBonds.map((bond) => (
        <RecomendedBond
            onClick={onRecomendationClick}
            key={bond.uid}
            bond={bond}
        />
    ))

    return (
        <section className='recomendations'>
            <h2 className='recomendations__title'>Рекомендации</h2>
            <div className='recomendations__slider'>
                {!isLoading ? (
                    <Slider
                        children={recomendedBondsComponents}
                        contentIsLoading={isLoading}
                    />
                ) : (
                    <Preloader />
                )}
            </div>
        </section>
    )
}
