import React, { FC, useEffect } from 'react'
import { Button } from '../../../shared/ui/button'
import './strategies.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { StrategyItem } from '../../../shared/ui/strategyItem'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { fetchStrategies } from '../../../entites/strategies'

export const Strategies: FC = () => {
    const dispatch = useAppDispatch()
    const { strategies, isLoading, error } = useTypedSelector(
        (state) => state.strategies
    )
    const strategyItems = strategies.map((strategy) => (
        <StrategyItem strategy={strategy} />
    ))

    useEffect(() => {
        dispatch(fetchStrategies())
    }, [])

    return (
        <section className='strategies'>
            {!isLoading ? (
                <>
                    <div className='strategies__header'>
                        <h2>Ваши cтратегии</h2>
                        <Button
                            onClick={() => console.log('sdasd')}
                            isDisabled={false}>
                            +
                        </Button>
                    </div>
                    <div className='strategies__content'>{strategyItems}</div>
                </>
            ) : (
                'Загрузка'
            )}
        </section>
    )
}
