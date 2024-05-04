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
    const isAuth = useTypedSelector((state) => state.auth.isAuth)
    const isLoading = useTypedSelector((state) => state.auth.isLoading)
    const error = useTypedSelector((state) => state.auth.error)
    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value)
    }

    const handleClick = () => {
        dispatch(auth({ Token: token }))
    }

    useEffect(() => {
        dispatch(isAuthMethod({}))
    }, [])

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth])

    useEffect(() => {
        console.log(error)
    }, [error])

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
                    <Button onClick={handleClick}>Войти</Button>
                </div>
            </div>
        </section>
    )
}
