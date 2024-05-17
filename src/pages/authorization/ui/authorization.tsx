import React, { useEffect, useState } from 'react'
import { TextField } from '../../../shared/ui/textField/textField'
import './authorization.scss'
import { Button } from '../../../shared/ui/button'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { auth, isAuthMethod } from '../../../entites/auth'
import { useNavigate } from 'react-router-dom'

export const Authorization = () => {
    const [token, setToken] = useState<string>('')
    const navigate = useNavigate()
    const { isAuth, isLoading, error } = useTypedSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value)
    }

    const handleClick = () => {
        dispatch(auth({ Token: token }))
    }

    useEffect(() => {
        dispatch(isAuthMethod())
    }, [])

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth])

    return (
        <section className='auth'>
            <h1>Авторизация</h1>
            <div className='auth__form'>
                <div className='auth__wrapper'>
                    <TextField
                        value={token}
                        label='Токен авторизации Tinkoff invest api'
                        onChange={handleChange}
                    />
                    <div>{error?.messageError}</div>
                    <Button onClick={handleClick}>Войти</Button>
                </div>
            </div>
        </section>
    )
}
