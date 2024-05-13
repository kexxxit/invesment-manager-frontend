import './header.scss'
import { BurgerButton } from '../../../shared/ui/burgerButton'
import { Dropdown, IOption } from '../../../shared/ui/dropdown'
import { RadioButton } from '../../../shared/ui/radioButton'

export const Header = () => {
    const dropdownOptions: IOption[] = [
        { value: 'ACC1', label: 'account 1' },
        { value: 'ACC2', label: 'account 2' },
        { value: 'ACC3', label: 'account 3' },
    ]

    const radioOptions: IOption[] = [
        { value: 'RADIO_LEFT', label: 'Руч.' },
        { value: 'RADIO_RIGHT', label: 'Авт.' },
    ]

    const onDropdownValueChange = (option: IOption) => {
        console.log(option.value)
    }

    const onRadioButtonClick = (option: IOption) => {
        console.log(option.value)
    }

    return (
        <div className='header__wrapper'>
            <div className='header__elem'>
                <BurgerButton />
            </div>
            <div className='header__elem header__account'>
                <Dropdown
                    options={dropdownOptions}
                    onSelect={onDropdownValueChange}
                    style='white'
                />
            </div>
            <div className='header__elem header__balance'>{'100000 руб.'}</div>
            <div className='header__elem header__radio-button'>
                <RadioButton
                    itemLeft={radioOptions[0]}
                    itemRight={radioOptions[1]}
                    onClick={onRadioButtonClick}
                />
            </div>
        </div>
    )
}
