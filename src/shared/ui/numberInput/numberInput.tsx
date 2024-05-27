import React, { FC, SetStateAction, useState } from 'react'
import './numberInput.scss'

interface NumberInputProps {
    placeholder?: string
    onChange: (value: SetStateAction<number>) => void
    value: number
}

export const NumberInput: FC<NumberInputProps> = ({
    placeholder,
    onChange,
    value,
}) => {
    const handleIncrement = () => {
        onChange((prevValue) => prevValue + 1)
    }

    const handleDecrement = () => {
        onChange((prevValue) => Math.max(prevValue - 1, 0))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        const value = inputValue ? Number(inputValue) : 0
        const numericValue = isNaN(value) ? 0 : value
        onChange(numericValue)
    }

    return (
        <div className='number-input'>
            <div className='number-input--wrapper'>
                <input
                    className='number-input__input'
                    type='text'
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                />
            </div>
            <div className='number-input__buttons'>
                <button
                    className='number-input__button number-input__button--increment'
                    onClick={handleIncrement}>
                    +
                </button>
                <button
                    className='number-input__button number-input__button--decrement'
                    onClick={handleDecrement}>
                    -
                </button>
            </div>
        </div>
    )
}
