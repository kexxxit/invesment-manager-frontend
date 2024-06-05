import React, { FC, useEffect } from 'react'
import './portfolio.scss'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { PortfolioItem } from '../../../shared/ui/portfolioItem'
import { useNavigate } from 'react-router-dom'
import { fetchPortfolio } from '../../../entites/portfolio'
import { Preloader } from '../../../shared/ui/perloader'

export const Portfolio: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { currentAccount } = useTypedSelector((state) => state.accounts)
    const { positions, totalAmountBonds, isLoading, error } = useTypedSelector(
        (state) => state.portfolo
    )
    const { isSandbox } = useTypedSelector((state) => state.accounts)

    const handleClick = (id: string) => {
        navigate(`/${id}`, { relative: 'path' })
    }

    const portfolioItems = positions.map((position) => (
        <PortfolioItem position={position} onClick={handleClick} />
    ))

    useEffect(() => {
        currentAccount &&
            dispatch(
                fetchPortfolio({
                    accontId: currentAccount.id,
                    isSandbox: isSandbox,
                })
            )
    }, [currentAccount])

    return (
        <section className='portfolio'>
            <h2>Портфель счета {currentAccount?.name}</h2>
            <div className='portfolio__header'>
                <h3>Облигация</h3>
                <h3>Цена</h3>
                <h3>Стоимость</h3>
                <h3>За все время</h3>
            </div>
            <div className='portfolio__items'>
                {isLoading ? <Preloader /> : portfolioItems}
            </div>
        </section>
    )
}
