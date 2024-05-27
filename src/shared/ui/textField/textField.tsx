import React, { useRef, useState } from 'react'
import './textField.scss'
import { useDebouncedCallback } from 'use-debounce'

interface TextFieldProps {
    label: string
    defaultValue: string
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChange: (query: string) => void
}

export const TextField: React.FC<TextFieldProps> = ({
    label,
    defaultValue,
    onChange,
}) => {
    const debounced = useDebouncedCallback(
        // function
        (value) => {
            onChange(value)
        },
        // delay in ms
        500
    )

    return (
        <div className='text-field'>
            <input
                defaultValue={defaultValue}
                type='text'
                placeholder={label}
                onChange={(e) => debounced(e.target.value)}
            />
        </div>
    )
}
