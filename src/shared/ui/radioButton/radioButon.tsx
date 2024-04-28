import { FC, useState } from 'react'
import { IOption } from '../dropdown'
import './radioButton.scss'

interface IRadio {
    /** Right value of the radiobutton */
    readonly itemRight: IOption
    /** Left value of the radiobutton */
    readonly itemLeft: IOption
    /** Handler */
    onClick: (option: IOption) => void
}

export const RadioButton: FC<IRadio> = (props) => {
    const { itemLeft, itemRight, onClick } = props

    const [activeItem, setActiveItem] = useState<IOption>(itemLeft)

    const handleSelect = (option: IOption) => {
        onClick(option)
        setActiveItem(option)
    }

    return (
        <div
            className='radio__wrapper'
            onClick={() =>
                handleSelect(activeItem === itemLeft ? itemRight : itemLeft)
            }>
            <div
                className={
                    'radio_active ' +
                    (activeItem === itemLeft
                        ? 'radio_active--left'
                        : 'radio_active--right')
                }
            />
            <div className='radio__label'>
                <div>{itemLeft.label}</div>
                <div>{itemRight.label}</div>
            </div>
        </div>
    )
}
