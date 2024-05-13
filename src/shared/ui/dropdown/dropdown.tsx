import { FC, useEffect, useRef, useState } from 'react'
import './dropdown.scss'
import { DEFAULT_DROPDOWN_VALUE } from '../../consts'

export interface IOption {
    readonly value: string
    readonly label: string
}

type Props = {
    options: IOption[]
    onSelect: (option: IOption) => void
    style: 'gray' | 'white'
    defaultValue?: string
}

export const Dropdown: FC<Props> = ({
    options,
    onSelect,
    style,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [option, setOption] = useState<IOption>(options[0])

    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (option: IOption) => {
        onSelect(option)
        setIsOpen(false)
        setOption(option)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
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

    return (
        <div className='dropdown' ref={dropdownRef}>
            <div
                className={
                    (style === 'gray'
                        ? 'dropdown__button-gray'
                        : 'dropdown__button') + (option.value === DEFAULT_DROPDOWN_VALUE
                          ? ' dropdown__text-color-gray'
                          : '')
                }
                onClick={toggleDropdown}>
                {option.label}
            </div>
            {isOpen && (
                <div className='dropdown__menu'>
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}>
                                {option.value === DEFAULT_DROPDOWN_VALUE ? '-' : option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
