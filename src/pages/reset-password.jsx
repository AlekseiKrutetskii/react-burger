import React, {useState, useRef} from 'react';
import {Link, Redirect} from 'react-router-dom'
import styles from './reset-password.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {history} from "../services/reducers";

export function ResetPasswordPage() {
    const [valueToken, setValueToken] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [typePassword, setTypePassword] = useState({type:'password', icon:'ShowIcon'})
    const inputTokenRef = useRef(null)
    const inputPasswordRef = useRef(null)
    const showPassword = () => {
        if (typePassword.type === 'text') {
            setTypePassword({type:'password', icon: 'ShowIcon'});
        } else {
            setTypePassword({type:'text', icon: 'HideIcon'});
        }

    }

    const handleOnClick = async () => {
        await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
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

    const isLoading = useSelector((store) => store.user.loading)
    const isAuth = useSelector((store) => !!store.user.data)
    const forgot = !!localStorage.getItem('forgot')

    if (isLoading === 'loading') {
        return null
    }

    if (isAuth || !forgot) {
        return (
            <Redirect
                to='/'
            />
        )
    }

    return (
        <div className={styles.wrap + " pt-20"}>
            <p className="text text_type_main-medium pb-10">Восстановление пароля</p>
            <Input icon={typePassword.icon} type={typePassword.type} placeholder={'Введите новый пароль'} onChange={e => setValuePassword(e.target.value)} onIconClick={showPassword} value={valuePassword} name={'password'} ref={inputPasswordRef} size={'default'} /><br />
            <Input type={'text'} placeholder={'Введите код из письма'} onChange={e => setValueToken(e.target.value)} value={valueToken} name={'code'} ref={inputTokenRef} size={'default'} /><br />
            <Button type="primary" size="medium" onClick={handleOnClick}>
                Сохранить
            </Button>
            <p className="text text_type_main-default pt-20">Вспомнили пароль? <Link className={styles.link} to={{ pathname: `/login/` }}>Войти</Link></p>
        </div>
    )
}


