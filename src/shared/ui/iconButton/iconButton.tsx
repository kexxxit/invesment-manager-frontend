import { FC } from 'react'
import './iconButton.scss'

interface IIconComponent {
    /** Icon component. */
    readonly svg: string
    /** Event handler when the button is clicked. */
    readonly onClick?: () => void
}

export const IconButton: FC<IIconComponent> = (props) => {
    const {
        svg,
        onClick,
    } = props

    return (
        <div onClick={onClick}>
            <img src={svg} alt='' />
        </div>
    )
}
