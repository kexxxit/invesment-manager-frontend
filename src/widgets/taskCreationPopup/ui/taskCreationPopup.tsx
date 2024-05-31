import React, { FC, useEffect, useState } from 'react'
import './taskCreationPopup.scss'
import { Button } from '../../../shared/ui/button'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { Dropdown, IOption } from '../../../shared/ui/dropdown'
import { STRATEGY_OPTIONS } from '../../../shared/consts/strategyOptions'
import { DEFAULT_DROPDOWN_VALUE, RATING_OPTIONS } from '../../../shared/consts'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { NumberInput } from '../../../shared/ui/numberInput'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { IStrategyRequest, Strategies } from '../../../shared/types'
import { createStrategyThunk } from '../../../entites/strategies'
import Cross from '../../../shared/assets/icons/cross.svg'
import { getKeyRate } from '../../../shared/api/cbrfKeyRate'
import { getMonthsDifference } from '../../../shared/lib/dateTime'

interface TaskCreationPopupProps {
    onClose: () => void
}

type ValuePiece = Date | null
type Value = ValuePiece

export const TaskCreationPopup: FC<TaskCreationPopupProps> = ({ onClose }) => {
    const { accounts, sandboxAccounts } = useTypedSelector(
        (state) => state.accounts
    )
    const currentDate = new Date()
    const startOfСurrentDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
    )
    const nextYearDate = new Date(startOfСurrentDay)
    nextYearDate.setFullYear(startOfСurrentDay.getFullYear() + 1)
    const minEndDate = new Date(startOfСurrentDay)
    minEndDate.setMonth(startOfСurrentDay.getMonth() + 2)

    const dispatch = useAppDispatch()
    const [isDataValid, setIsDataValid] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<Value>(startOfСurrentDay)
    const [endDate, setEndDate] = useState<Value>(nextYearDate)
    const [strategy, setStrategy] = useState<IOption>(STRATEGY_OPTIONS[0])
    const [rating, setRating] = useState<IOption>(RATING_OPTIONS[0])
    const [isSandbox, setIsSandbox] = useState<boolean>(false)
    const [desiredPercentage, setDesiredPercentage] = useState<number>(0)
    const [intervalCount, setIntervalCount] = useState<number>(1)
    const [isChooseWithHigherRating, setIsChooseWithHigherRating] =
        useState<boolean>(false)
    const accs: IOption[] = (isSandbox ? sandboxAccounts : accounts).map(
        (account) => ({
            label: account.name,
            value: account.id,
        })
    )
    accs.unshift({
        value: DEFAULT_DROPDOWN_VALUE,
        label: 'Аккаунт',
    })
    const [dropdownOptions, setDropdownOptions] = useState<IOption[]>(accs)

    const [account, setAccount] = useState<IOption>(
        dropdownOptions[0] ?? undefined
    )

    const maxIntervalsCount =
        startDate && endDate
            ? getMonthsDifference(startDate, endDate)
            : undefined

    const createButtonHandler = () => {
        const strategyRequest: IStrategyRequest = {
            strategy: Number(strategy.value),
            desiredPercentage: desiredPercentage,
            bondRating: Number(rating.value),
            startDate: startDate!,
            endDate: endDate!,
            isCooseWithAHigherRating: isChooseWithHigherRating,
            accountId: account.value,
            isEnabled: true,
            intervalCount: intervalCount,
            isSandbox: isSandbox,
        }
        dispatch(createStrategyThunk(strategyRequest))
        onClose()
    }

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        if (rating.value === DEFAULT_DROPDOWN_VALUE || rating.value === '1')
            setIsChooseWithHigherRating(false)
    }, [rating])

    useEffect(() => {
        const opt: IOption[] = (isSandbox ? sandboxAccounts : accounts).map(
            (account) => ({
                label: account.name,
                value: account.id,
            })
        )
        opt.unshift({
            value: DEFAULT_DROPDOWN_VALUE,
            label: 'Аккаунт',
        })
        setDropdownOptions(opt)
    }, [isSandbox])

    useEffect(() => {
        const keyRate = getKeyRate()
        keyRate
            .then((value) => setDesiredPercentage(value))
            .catch((ex) => console.log(ex))
    }, [])

    useEffect(() => {
        setIsDataValid(
            account.value !== DEFAULT_DROPDOWN_VALUE &&
                strategy.value !== DEFAULT_DROPDOWN_VALUE &&
                rating.value !== DEFAULT_DROPDOWN_VALUE &&
                startDate !== null &&
                endDate !== null
        )
    }, [account, strategy, rating, startDate, endDate])

    return (
        <div className='task-creation-popup'>
            <div className='task-creation-popup__content'>
                <div className='task-creation-popup__content__header'>
                    <h2>Создание новой стратегии</h2>
                    <div
                        className='task-creation-popup__content__header__close-buton'
                        onClick={handleClose}>
                        <img src={Cross} alt='' />
                    </div>
                </div>
                <div className='task-creation-popup__content__form'>
                    <Dropdown
                        currentValue={strategy}
                        options={STRATEGY_OPTIONS}
                        onSelect={(option) => setStrategy(option)}
                        style={'gray'}
                    />
                    <Dropdown
                        currentValue={rating}
                        options={RATING_OPTIONS}
                        onSelect={(option) => setRating(option)}
                        style={'gray'}
                    />
                    <Dropdown
                        currentValue={account}
                        options={dropdownOptions}
                        onSelect={(option) => setAccount(option)}
                        style={'gray'}
                    />
                    <div className='task-creation-popup__content__form--checkbox'>
                        <input
                            type='checkbox'
                            id='sandbox-checkbox'
                            checked={isSandbox}
                            onChange={() => setIsSandbox(!isSandbox)}
                        />
                        <label htmlFor='sandbox-checkbox'>Песочница</label>
                    </div>
                    <div className='task-creation-popup__content__form__item'>
                        <h3>Дата начала:</h3>
                        <DateTimePicker
                            locale='ru-RU'
                            format={'y-MM-dd'}
                            disableClock={true}
                            value={startDate}
                            minDate={startOfСurrentDay}
                            onChange={setStartDate}
                        />
                    </div>
                    <div className='task-creation-popup__content__form__item'>
                        <h3>Дата окончания:</h3>
                        <DateTimePicker
                            locale='ru-RU'
                            format={'y-MM-dd'}
                            disableClock={true}
                            minDate={minEndDate}
                            value={endDate}
                            onChange={setEndDate}
                        />
                    </div>
                    <div className='task-creation-popup__content__form__item'>
                        <h3>Желаемый процент прибыли:</h3>
                        <NumberInput
                            onChange={setDesiredPercentage}
                            value={desiredPercentage}
                        />
                    </div>
                    <div className='task-creation-popup__content__form--checkbox'>
                        <input
                            disabled={
                                rating.value === '1' ||
                                rating.value === DEFAULT_DROPDOWN_VALUE
                            }
                            type='checkbox'
                            id='rating-checkbox'
                            checked={isChooseWithHigherRating}
                            onChange={() =>
                                setIsChooseWithHigherRating(
                                    !isChooseWithHigherRating
                                )
                            }
                        />
                        <label htmlFor='rating-checkbox'>
                            Покупать облигации с рейтином выше выбранного
                        </label>
                    </div>
                    {Number(strategy.value) !== Strategies.BARRBEL ? (
                        <div className='task-creation-popup__content__form__item'>
                            <h3>
                                Количество интервалов{' '}
                                {`(макс. ${maxIntervalsCount})`}:
                            </h3>
                            <NumberInput
                                onChange={setIntervalCount}
                                value={intervalCount}
                                max={maxIntervalsCount}
                                min={1}
                            />
                        </div>
                    ) : null}
                </div>
                <div className='task-creation-popup__content--create-button'>
                    <Button
                        onClick={createButtonHandler}
                        isDisabled={!isDataValid}>
                        Создать
                    </Button>
                </div>
            </div>
        </div>
    )
}
