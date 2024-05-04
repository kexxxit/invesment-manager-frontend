import React, { FC } from 'react'
import { IBond } from '../../types'
import './bondItem.scss'
import { LogoSize, createLogoUrl } from '../../lib/logo'
import StarFilled from '../../assets/icons/starFilled.svg'
import { convertDateFormat } from '../../lib/dateTime'

interface BondItemProps {
    bond: IBond
}

export const BondItem: FC<BondItemProps> = ({ bond }) => {
    return (
        <div className='bond'>
            <img className='bond__logo' src={createLogoUrl(bond.logoName, LogoSize.Small)} alt='' />
            <div className='bond__name-group'>
                <h3>{bond.name}</h3>
                <h3 className='bond__isin'>{bond.isin}</h3>
                <div>
                    <img src={StarFilled} alt='' />
                    <img src={StarFilled} alt='' />
                    <img src={StarFilled} alt='' />
                </div>
            </div>
            <h3>{bond.sector}</h3>
            <h3>{convertDateFormat(bond.maturityDate)}</h3>
            <h3>{bond.yieldToMaturity}%</h3>
            <h3>{bond.price} руб.</h3>
        </div>
    )
}
