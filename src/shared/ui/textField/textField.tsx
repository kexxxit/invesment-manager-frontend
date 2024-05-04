import React from 'react'
import './textField.scss'

interface TextFieldProps {
    label: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField: React.FC<TextFieldProps> = ({
    label,
    value,
    onChange,
}) => {
    return (
        <div className='text-field'>
            <input
                type='text'
                placeholder={label}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
