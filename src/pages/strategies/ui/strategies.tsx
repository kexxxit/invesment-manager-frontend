import React, { FC, useEffect, useState } from 'react'
import { Button } from '../../../shared/ui/button'
import './strategies.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { StrategyItem } from '../../../shared/ui/strategyItem'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { fetchStrategies } from '../../../entites/strategies'
import { TaskCreationPopup } from '../../../widgets/taskCreationPopup'
import { Preloader } from '../../../shared/ui/perloader'

export const Strategies: FC = () => {
    const dispatch = useAppDispatch()
    const { strategies, isLoading, error } = useTypedSelector(
        (state) => state.strategies
    )
    const strategyItems = strategies.map((strategy) => (
        <StrategyItem strategy={strategy} />
    ))

    const [isPopupOpen, setPopupOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchStrategies())
    }, [])

    const handleOpenPopup = () => {
        setPopupOpen(true)
    }

    const handleClosePopup = () => {
        setPopupOpen(false)
    }

    return (
        <section className='strategies'>
            <div className='strategies__header'>
                <h2>Ваши cтратегии</h2>
                {!isLoading && (
                    <Button onClick={handleOpenPopup} isDisabled={false}>
                        +
                    </Button>
                )}
            </div>
            {isLoading ? (
                <Preloader />
            ) : (
                <div className='strategies__content'>{strategyItems}</div>
            )}
            {isPopupOpen && <TaskCreationPopup onClose={handleClosePopup} />}
        </section>
    )
}
