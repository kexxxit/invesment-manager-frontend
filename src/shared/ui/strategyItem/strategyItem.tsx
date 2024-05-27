import React, { FC } from 'react'
import { IStrategy, Strategies } from '../../types'
import './strategyItem.scss'
import SettingsIcon from '../../assets/icons/settingsIcon.svg'
import { Profit } from '../profit'
import { useTypedSelector } from '../../lib/store/useTypesSelector'
import { getRatingTitle } from '../../lib/ratingTitle'
import { Button } from '../button'

interface StrategyItemProps {
    readonly strategy: IStrategy
    // readonly onClick: (strategyId: string) => void
}

export const StrategyItem: FC<StrategyItemProps> = ({ strategy }) => {
    const { accounts } = useTypedSelector((state) => state.accounts)

    const accountName = accounts.find(
        (account) => account.id === strategy.accountId
    )?.name
    const balance = strategy.totalAmountBonds + strategy.totalAmountCurrencies
    const profit = balance * (strategy.expectedYield / 100)
    const ratingTitle = getRatingTitle(strategy.bondRating)

    const deleteClickHandler = () => {}

    const startStopClickHandler = () => {}

    return (
        <div className='strategy'>
            <div className='strategy__header'>
                <Profit profit={strategy.expectedYield} />
                <h1>
                    {strategy.strategy === Strategies.LADDER
                        ? 'Лестница'
                        : 'Штанга'}
                </h1>
                <div className='strategy__header-img'>
                    <img src={SettingsIcon} alt='' />
                </div>
            </div>
            <div className='strategy__content'>
                <div className='strategy__content--item'>
                    <h3 className='strategy__content--item-title'>Счет:</h3>
                    <h3>{accountName}</h3>
                </div>
                <div className='strategy__content--item'>
                    <h3 className='strategy__content--item-title'>Рейтинг:</h3>
                    <h3>{ratingTitle}</h3>
                </div>
                <div className='strategy__content--item'>
                    <h3 className='strategy__content--item-title'>Баланс:</h3>
                    <h3>{balance.toFixed(2) + ' руб.'}</h3>
                </div>
                <div className='strategy__content--item'>
                    <h3 className='strategy__content--item-title'>Прибыль:</h3>
                    <h3
                        className={
                            profit < 0
                                ? 'profit-text-color-red'
                                : 'profit-text-color-green'
                        }>
                        {profit.toFixed(2) + ' руб.'}
                    </h3>
                </div>
            </div>
            <div className='strategy__buttons'>
                <Button onClick={startStopClickHandler} isDisabled={false}>
                    Стоп
                </Button>
                <div className='strategy__buttons--delete'>
                    <Button onClick={deleteClickHandler} isDisabled={false}>
                        Удалить
                    </Button>
                </div>
            </div>
        </div>
    )
}
