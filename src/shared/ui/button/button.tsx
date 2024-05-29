import React from 'react'
import './button.scss'

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    isDisabled: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    isDisabled,
}) => {
    console.log(isDisabled)
    return (
        <button disabled={isDisabled} className='button' onClick={onClick}>
            {children}
        </button>
    )
}
