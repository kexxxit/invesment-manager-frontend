import React, { FC, SetStateAction, useState } from 'react'
import './numberInput.scss'

interface NumberInputProps {
    placeholder?: string
    onChange: (value: SetStateAction<number>) => void
    value: number,
    max?: number
    min?: number
}

export const NumberInput: FC<NumberInputProps> = ({
    placeholder,
    onChange,
    value,
    max,
    min
}) => {
    const handleIncrement = () => {
        if (max !== undefined && value >= max) {
            return;
        }
        onChange((prevValue) => prevValue + 1)
    }

    const handleDecrement = () => {
        if (min !== undefined && value <= min) {
            return;
        }
        onChange((prevValue) => Math.max(prevValue - 1, 0))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        const value = inputValue ? Number(inputValue) : 0
        const numericValue = isNaN(value) ? 0 : value
        if (max !== undefined && numericValue > max) {
            onChange(max);
        } else if (min !== undefined && numericValue < min) {
            onChange(min);
        } else {
            onChange(numericValue)
        }
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
