import React, { FC, useEffect, useState } from 'react'
import './bond.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useNavigate, useParams } from 'react-router-dom'
import { RecomendedBond } from '../../../shared/ui/recomendedBond'
import {
    fetchBondPage,
    postOrder,
    getTradingStatusThunk,
    clearOrder,
} from '../../../entites/bondPage'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { convertDateFormat } from '../../../shared/lib/dateTime'
import {
    EventType,
    INotification,
    IOrderRequest,
    OrderDirection,
    OrderType,
    PriceType,
} from '../../../shared/types'
import { Button } from '../../../shared/ui/button'
import { NumberInput } from '../../../shared/ui/numberInput'
import { getAccountBalanceThunk } from '../../../entites/accounts/model/accountsThunk'
import { setNotification } from '../../../entites/notifications'

export const Bond: FC = () => {
    const [lotSize, setLotSize] = useState<number>(1)
    const { bondId } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { bond, bondEvents, isLoading, error } = useTypedSelector(
        (state) => state.bondPage
    )
    const { order, isOrderLoading, isTradingEnabled, orderError } =
        useTypedSelector((state) => state.order)
    const { currentAccount } = useTypedSelector((state) => state.accounts)

    const bondEventsTable = bondEvents?.map((event) => {
        const actual = new Date(event.eventDate) > new Date()

        return (
            <tr
                className={!actual ? 'bond-page--info__table--active_elem' : ''}
                key={event.id}>
                <td>
                    <h3>{convertDateFormat(event.eventDate)}</h3>
                </td>
                <td>
                    <h3>{event.payOneBond} руб.</h3>
                </td>
                <td>
                    <h3>
                        {event.eventType === EventType.Cpn
                            ? 'Купон'
                            : 'Погашение'}
                    </h3>
                </td>
            </tr>
        )
    })

    const onClickBuyButton = () => {
        if (currentAccount && bond) {
            const req: IOrderRequest = {
                quantity: lotSize,
                direction: OrderDirection.Buy,
                accountId: 'd857c582-681f-4f74-a21a-c7e40a63868b',
                orderType: OrderType.Market,
                instrumentId: bond.uid,
                priceType: PriceType.Currency,
            }
            dispatch(postOrder(req))
            dispatch(getAccountBalanceThunk(currentAccount.id))
        }
    }

    useEffect(() => {
        dispatch(getTradingStatusThunk())
        if (bondId) {
            dispatch(fetchBondPage(bondId))
        }
        return () => {
            dispatch(clearOrder())
        }
    }, [])

    useEffect(() => {
        if (order) {
            const notification: INotification = {
                title: 'Покупка',
                message: `Покупка облигации ${bond?.name} 
                    завершена успешно (${order.lotsExecuted} из ${order.lotsRequested})`,
            }
            dispatch(dispatch(setNotification(notification)))
        }
    }, [order])

    return !isLoading && bond ? (
        <section className='bond-page'>
            <div className='bond-page--wrapper'>
                <div className='bond-page--card'>
                    {<RecomendedBond bond={bond} />}
                </div>
                <div className='bond-page--info'>
                    <h2>График выплат</h2>
                    <div className='bond-page--info__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Выплата</th>
                                    <th>Вид выплаты</th>
                                </tr>
                            </thead>
                            <tbody>{bondEventsTable}</tbody>
                        </table>
                    </div>
                </div>
                <div className='bond-page--buy'>
                    <div className='bond-page--buy__container'>
                        <h2 className='bond-page--buy__title'>Покупка</h2>
                        <h3>Количество лотов</h3>
                        <NumberInput
                            placeholder='Лотность'
                            onChange={setLotSize}
                            value={lotSize}
                        />
                        <div className='bond-page--buy__total'>
                            <div className='bond-page--buy__total--item'>
                                <h3 className='bond-page--buy__total--item-title'>
                                    НКД
                                </h3>
                                <h3 className='bond-page--buy__total--item-price'>
                                    {(bond.aciValue * lotSize).toFixed(2)} руб.
                                </h3>
                            </div>
                            <div className='bond-page--buy__total--item'>
                                <h3 className='bond-page--buy__total--item-title'>
                                    Итого
                                </h3>
                                <h3 className='bond-page--buy__total--item-price'>
                                    {(
                                        (bond.aciValue + bond.price) *
                                        lotSize
                                    ).toFixed(2)}{' '}
                                    руб.
                                </h3>
                            </div>
                        </div>
                        <div className='bond-page--buy__button'>
                            <Button
                                isDisabled={
                                    !isTradingEnabled ||
                                    lotSize <= 0 ||
                                    isOrderLoading
                                }
                                onClick={onClickBuyButton}>
                                {isTradingEnabled ? 'Купить' : 'Биржа закрыта'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <div>Загрузка...</div>
    )
}
