import React, { FC } from 'react'
import './profit.scss'

interface IProfitProps {
    readonly profit: number
}

export const Profit: FC<IProfitProps> = ({ profit }) => {
    return (
        <div className={`profit ${profit < 0 ? 'profit-red' : 'profit-greed'}`}>
            {`${profit > 0 ? '+' : ''}${profit.toFixed(2)}%`}
        </div>
    )
}
