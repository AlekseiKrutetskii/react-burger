import React, { useState, useRef} from 'react';
import {Link, Redirect} from 'react-router-dom'
import styles from './reset-password.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {history, RootState} from "../services/reducers";
import {apiURL} from "../utils/data";
import {TPassword} from "../types";

export const ResetPasswordPage: React.FC = () => {
    const [valueToken, setValueToken] = useState<string>('')
    const [valuePassword, setValuePassword] = useState<string>('')
    const [typePassword, setTypePassword] = useState<TPassword>({type:'password', icon:'ShowIcon'})
    const inputTokenRef = useRef<HTMLInputElement>(null)
    const inputPasswordRef = useRef<HTMLInputElement>(null)
    const showPassword = ():void => {
        if (typePassword.type === 'text') {
            setTypePassword({type:'password', icon: 'ShowIcon'});
        } else {
            setTypePassword({type:'text', icon: 'HideIcon'});
        }

    }

    const onSubmitHandle = async (e) => {
        e.preventDefault()
        await fetch(apiURL+'password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: valuePassword, token: valueToken})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                localStorage.removeItem('forgot')
                history.push('/login')
            })
            .catch(() => console.log('some error'))
    }

    const isLoading = useSelector((store: RootState) => store.user.loading)
    const isAuth = useSelector((store: RootState) => !!store.user.data)
    const forgot = localStorage.getItem('forgot')

    if (isLoading === 'loading') {
        return null
    }

    if (isAuth || forgot !== 'yes') {
        return (
            <Redirect
                to='/'
            />
        )
    }

    return (
        <div className={styles.wrap + " pt-20"}>
            <p className="text text_type_main-medium pb-10">Восстановление пароля</p>
            <form onSubmit={onSubmitHandle} className={styles.wrap}>
                <Input icon={typePassword.icon} type={typePassword.type} placeholder={'Введите новый пароль'} onChange={e => setValuePassword(e.target.value)} onIconClick={showPassword} value={valuePassword} name={'password'} ref={inputPasswordRef} size={'default'} /><br />
                <Input type={'text'} placeholder={'Введите код из письма'} onChange={e => setValueToken(e.target.value)} value={valueToken} name={'code'} ref={inputTokenRef} size={'default'} /><br />
                <Button type="primary" size="medium">Сохранить</Button>
            </form>
            <p className="text text_type_main-default pt-20">Вспомнили пароль? <Link className={styles.link} to={{ pathname: `/login/` }}>Войти</Link></p>
        </div>
    )
}


