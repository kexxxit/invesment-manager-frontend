import React, { FC, useEffect } from 'react'
import './portfolio.scss'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { PortfolioItem } from '../../../shared/ui/portfolioItem'
import { useNavigate } from 'react-router-dom'
import { fetchPortfolio } from '../../../entites/portfolio'

export const Portfolio: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { currentAccount } = useTypedSelector((state) => state.accounts)
    const { positions, totalAmountBonds, isLoading, error } = useTypedSelector(
        (state) => state.portfolo
    )

    const handleClick = (id: string) => {
        navigate(`/${id}`, { relative: 'path' })
    }

    const portfolioItems = positions.map((position) => (
        <PortfolioItem position={position} onClick={handleClick} />
    ))

    useEffect(() => {
        currentAccount && dispatch(fetchPortfolio(currentAccount?.id))
    }, [currentAccount])

    return (
        <section className='portfolio'>
            <h2>Портфель счета {currentAccount?.name}</h2>
            <div className='portfolio__header'>{}</div>
            <div className='portfolio__items'>{portfolioItems}</div>
        </section>
    )
}
