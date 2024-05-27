import { FC, useEffect, useRef, useState } from 'react'
import './burgerButton.scss'
import { Link } from 'react-router-dom'

interface ILink {
    value: string
    label: string
    href: string
}

export const BurgerButton: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const burgerButtonRef = useRef<HTMLDivElement>(null)
    const links: ILink[] = [
        {
            value: 'main',
            label: 'Главная',
            href: '',
        },
        {
            value: 'strategies',
            label: 'Стратегии',
            href: 'strategies',
        },
        {
            value: 'operations',
            label: 'Список операций',
            href: 'operations',
        },
        {
            value: 'favorites',
            label: 'Избранные',
            href: 'favorites',
        },
    ]

    const handleClickOutside = (event: MouseEvent) => {
        if (
            burgerButtonRef.current &&
            !burgerButtonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
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
                    </ul>
                </div>
            )}
        </div>
    )
}
