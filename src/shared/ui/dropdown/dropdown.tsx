import { FC, useEffect, useRef, useState } from 'react'
import './dropdown.scss'

export interface IOption {
    readonly value: string
    readonly label: string
}

type Props = {
    options: IOption[]
    onSelect: (option: IOption) => void
}

export const Dropdown: FC<Props> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [accountName, setAccountName] = useState<string>(options[0].label)

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (option: IOption) => {
        onSelect(option)
        setIsOpen(false)
        setAccountName(option.label)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className='dropdown' ref={dropdownRef}>
            <div className='dropdown__button' onClick={toggleDropdown}>
                {accountName}
            </div>
            {isOpen && (
                <div className='dropdown__menu'>
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}>
                                {option.label}  
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
