import { FC } from 'react'
import './radioButton.scss'

interface IRadio {
    /** State flag */
    readonly flag: boolean
    /** Handler */
    onClick: () => void
}

export const RadioButton: FC<IRadio> = ({ flag, onClick }) => {
    return (
        <div className='radio__wrapper' onClick={onClick}>
            <div
                className={
                    'radio_active ' +
                    (flag ? 'radio_active--right' : 'radio_active--left')
                }
            />
        </div>
    )
}
