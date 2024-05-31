import { FC, useEffect, useRef, useState } from 'react'
import './burgerButton.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../lib/store/useAppDispatch'
import { logoutThunk } from '../../../entites/auth'

interface ILink {
    value: string
    label: string
    href: string
}

interface IBurgerButtonProps {
    links: ILink[]
}

export const BurgerButton: FC<IBurgerButtonProps> = ({ links }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const burgerButtonRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const handleClickOutside = (event: MouseEvent) => {
        if (
            burgerButtonRef.current &&
            !burgerButtonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    const handleLogoutClick = () => {
        dispatch(logoutThunk())
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen])

    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div ref={burgerButtonRef} className='burger-button__container'>
            <div onClick={handleClick} className='burger-button'>
                <div
                    className={`burger-button__stick ${isOpen ? 'burger-button__stick--top__active' : ''}`}
                />
                <div
                    className={`burger-button__stick ${isOpen ? 'burger-button__stick--middle__active' : ''}`}
                />
                <div
                    className={`burger-button__stick ${isOpen ? 'burger-button__stick--bottom__active' : ''}`}
                />
            </div>
            {isOpen && (
                <div className='burger-button__menu'>
                    <ul>
                        {links.map((option) => (
                            <li key={option.value}>
                                <Link onClick={handleClick} to={option.href}>
                                    {option.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={handleLogoutClick}
                                className='burger-button__menu__logout'>
                                Выйти
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
