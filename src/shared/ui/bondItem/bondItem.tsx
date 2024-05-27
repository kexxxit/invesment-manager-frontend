import React, { FC } from 'react'
import { IBond } from '../../types'
import './bondItem.scss'
import { LogoSize, createLogoUrl } from '../../lib/logo'
import StarFilled from '../../assets/icons/starFilled.svg'
import Star from '../../assets/icons/star.svg'
import { convertDateFormat } from '../../lib/dateTime'
import { SECTOR_OPTIONS } from '../../consts'

interface BondItemProps {
    readonly bond: IBond
    readonly onClick: (bondId: string) => void
}

export const BondItem: FC<BondItemProps> = ({ bond, onClick }) => {
    const ratingStars = [
        <img key={0} src={StarFilled} alt='' />,
        <img key={1} src={bond.riskLevel <= 2 ? StarFilled : Star} alt='' />,
        <img key={2} src={bond.riskLevel === 1 ? StarFilled : Star} alt='' />,
    ]

    const sector = SECTOR_OPTIONS.find((sector) => sector.value === bond.sector)?.label

    return (
        <div onClick={() => onClick(bond.uid)} className='bond'>
            <img
                className='bond__logo'
                src={createLogoUrl(bond.logoName, LogoSize.Small)}
                alt=''
            />
            <div className='bond__name-group'>
                <h3 className='bond__name'>{bond.name}</h3>
                <h3 className='bond__isin'>{bond.isin}</h3>
                <div>{ratingStars}</div>
            </div>
            <h3>{sector}</h3>
            <h3>{convertDateFormat(bond.maturityDate)}</h3>
            <h3>{bond.yieldToMaturity}%</h3>
            <h3>{bond.price} руб.</h3>
        </div>
    )
}
