import React, { FC, useEffect, useState } from 'react'
import { IBond } from '../../types'
import './recomendedBond.scss'
import { IYieldByPeriods, calcYieldByPeriods } from '../../lib/yield'
import { LogoSize, createLogoUrl } from '../../lib/logo'

type PropsType = {
    bond: IBond
    readonly onClick?: (id: string) => void
}

export const RecomendedBond: FC<PropsType> = ({ bond, onClick }) => {
    const [yieldPerPeriods, setYieldPerPeriods] =
        useState<IYieldByPeriods | null>(null)

    useEffect(() => {
        setYieldPerPeriods(calcYieldByPeriods(bond))
    }, [bond])

    return (
        <div
            onClick={() => (onClick ? onClick(bond.uid) : null)}
            className={`recomendation ${onClick ? 'recomendation__clickable' : ''}`}>
            <img
                className='recomendation__logo'
                src={createLogoUrl(bond.logoName, LogoSize.Small)}
                alt=''
            />
            <div className='recomendation__info'>
                <div>
                    <h1 className='recomendation__name'>{bond.name}</h1>
                    <h3>{bond.isin}</h3>
                </div>
                <div className='recomendation__specifications'>
                    <div>
                        <h3>Цена</h3>
                        <h2>{bond.price} руб.</h2>
                    </div>
                    <div>
                        <h3>Доходность к погашению</h3>
                        <h2>{bond.yieldToMaturity} % годовых</h2>
                    </div>
                </div>
            </div>
            <div className='recomendation__yield'>
                <h2>Доходность за приобретенную единицу</h2>
                {yieldPerPeriods ? (
                    <div className='recomendation__yield--spec'>
                        <div>
                            <h2>{yieldPerPeriods.firstPeriod.yield} руб.</h2>
                            <h2>
                                За {yieldPerPeriods.firstPeriod.mounthsNumber}{' '}
                                мес.
                            </h2>
                        </div>
                        <div>
                            <h2>{yieldPerPeriods.secondPeriod.yield} руб.</h2>
                            <h2>
                                За {yieldPerPeriods.secondPeriod.mounthsNumber}{' '}
                                мес.
                            </h2>
                        </div>
                        <div>
                            <h2>{yieldPerPeriods.thirdPeriod.yield} руб.</h2>
                            <h2>
                                За {yieldPerPeriods.thirdPeriod.mounthsNumber}{' '}
                                мес.
                            </h2>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </div>
    )
}
