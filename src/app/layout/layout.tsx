import { Outlet, useNavigate } from 'react-router-dom'
import './layout.scss'
import { Header } from '../../widgets/header'
import { useEffect } from 'react'
import { useTypedSelector } from '../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../shared/lib/store/useAppDispatch'
import { isAuthMethod } from '../../entites/auth'

export const Layout = () => {
    const navigate = useNavigate()
    const isAuth = useTypedSelector(
        (state) => state.auth.isAuth
    )
    const isLoading = useTypedSelector(
        (state) => state.auth.isLoading
    )
    const error = useTypedSelector((state) => state.auth.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(isAuthMethod({}))
    }, [])
    
    useEffect(() => {
        if(!isLoading && !isAuth) {
            navigate('/auth')
        }
    }, [isAuth, isLoading])
    
    return (
        <>
            <Header />

            <main className='layout__content'>
                <Outlet />
            </main>

            {/* <Footer className='layout__footer' /> */}
        </>
    )
}
