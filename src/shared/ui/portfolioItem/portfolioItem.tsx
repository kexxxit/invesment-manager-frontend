import React, { FC } from 'react'
import { IPosition } from '../../types'
import './portfolioItem.scss'
import { LogoSize, createLogoUrl } from '../../lib/logo'

interface PositionsProps {
    readonly position: IPosition
    readonly onClick: (bondId: string) => void
}

export const PortfolioItem: FC<PositionsProps> = ({ position, onClick }) => {
    return (
        <div onClick={() => onClick(position.uid)} className='position'>
            <img
                className='position__logo'
                src={createLogoUrl(position.logoName, LogoSize.Small)}
                alt=''
            />
            <div className='position__name-group'>
                <h3 className='position__name'>{position.name}</h3>
                <h3 className='position__isin'>{position.isin}</h3>
            </div>
            <h3>{position.price.toFixed(2)} руб.</h3>
            <h3>{(position.price * position.quantity).toFixed(2)} руб.</h3>
            <h3 className='position__profit'>{(position.expectedYield * position.quantity).toFixed(2)} руб.</h3>
        </div>
    )
}
