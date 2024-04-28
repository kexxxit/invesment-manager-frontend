import { FC } from 'react'
import './burgerButton.scss'

export const BurgerButton: FC = () => {
    return (
        <div className='burger-button'>
            <div className='burger-button__stick burger-button__stick--top'/>
            <div className='burger-button__stick burger-button__stick--middle'/>
            <div className='burger-button__stick burger-button__stick--bottom'/>
        </div>
    )
}
