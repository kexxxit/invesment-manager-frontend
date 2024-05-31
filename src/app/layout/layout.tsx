import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './layout.scss'
import { Header } from '../../widgets/header'
import { useEffect } from 'react'
import { useTypedSelector } from '../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../shared/lib/store/useAppDispatch'
import { isAuthMethod } from '../../entites/auth'
import { getAccountsThunk } from '../../entites/accounts'
import { getAccountBalanceThunk } from '../../entites/accounts/model/accountsThunk'
import { Notification } from '../../widgets/notification'

export const Layout = () => {
    const navigate = useNavigate()
    const { isAuth, isLoading, error } = useTypedSelector((state) => state.auth)
    const { currentAccount } = useTypedSelector((state) => state.accounts)
    const dispatch = useAppDispatch()
    const location = useLocation()
    
    useEffect(() => {
        dispatch(isAuthMethod())
        dispatch(getAccountsThunk())
    }, [])

    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate('/auth')
        }
    }, [isAuth, isLoading])

    useEffect(() => {
        if (currentAccount) dispatch(getAccountBalanceThunk(currentAccount.id))
    }, [currentAccount])

    return (
        <>
            {location.pathname !== 'auth' && <Header />}

            <main className='layout__content'>
                <Outlet />
                <Notification />
            </main>

            {/* <Footer className='layout__footer' /> */}
        </>
    )
}