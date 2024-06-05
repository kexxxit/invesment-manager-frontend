import './header.scss'
import { BurgerButton } from '../../../shared/ui/burgerButton'
import { Dropdown, IOption } from '../../../shared/ui/dropdown'
import { RadioButton } from '../../../shared/ui/radioButton'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { setCurrentAccount, toggleSandbox } from '../../../entites/accounts'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../../shared/consts'

export const Header = () => {
    const dispatch = useAppDispatch()
    const {
        accounts,
        accountsOptions,
        balance,
        sandboxAccounts,
        currentAccount,
        isSandbox,
        error,
        isLoading,
    } = useTypedSelector((state) => state.accounts)
    const location = useLocation()
    const currentPath = location.pathname

    const currentOption: IOption | undefined = currentAccount
        ? {
              label: currentAccount?.name,
              value: currentAccount?.id,
          }
        : undefined

    const radioOptions: IOption[] = [
        { value: 'RADIO_LEFT', label: 'Руч.' },
        { value: 'RADIO_RIGHT', label: 'Авт.' },
    ]

    const onDropdownValueChange = (option: IOption) => {
        const chosedAccount = (isSandbox ? sandboxAccounts : accounts).find(
            (account) => account.id === option.value
        )
        if (chosedAccount) dispatch(setCurrentAccount(chosedAccount))
    }

    return (
        <div className='header__wrapper'>
            <div className='header__elem'>
                <BurgerButton links={NAV_LINKS} />
            </div>
            {currentPath !== '/strategies' && currentPath !== '/faq' ? (
                <>
                    <div className='header__elem header__account'>
                        <Dropdown
                            currentValue={currentOption}
                            options={accountsOptions}
                            onSelect={onDropdownValueChange}
                            style='white'
                        />
                    </div>
                    <div className='header__elem header__balance'>{`${balance} руб.`}</div>
                    <div className='header__elem header__radio-button'>
                        <h3>Песочница</h3>
                        <RadioButton
                            flag={isSandbox}
                            onClick={() => dispatch(toggleSandbox())}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div></div>
                    <div></div>
                </>
            )}
        </div>
    )
}
