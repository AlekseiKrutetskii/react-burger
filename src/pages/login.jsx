import React, {useState, useRef} from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom'
import styles from './login.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {loginUser} from "../services/slices/user";
import {useDispatch, useSelector} from "react-redux";

export function LoginPage() {
    const [valueEmail, setValueEmail] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [typePassword, setTypePassword] = useState({type:'password', icon:'ShowIcon'})
    const inputEmailRef = useRef(null)
    const inputPasswordRef = useRef(null)
    const location = useLocation();
    const showPassword = () => {
        if (typePassword.type === 'text') {
            setTypePassword({type:'password', icon: 'ShowIcon'});
        } else {
            setTypePassword({type:'text', icon: 'HideIcon'});
        }

    }

    const dispatch = useDispatch()

    const onSubmitHandle = (e) => {
        e.preventDefault()
        if (inputEmailRef.current !== null && inputPasswordRef.current !== null) {
            // @ts-ignore
            let email = inputEmailRef.current.value;
            // @ts-ignore
            let password = inputPasswordRef.current.value;
            dispatch(loginUser(JSON.stringify({
                email: email,
                password: password,
            })));
        }
    }

    const isLoading = useSelector((store) => store.user.loading)
    const isAuth = useSelector((store) => !!store.user.data)

    if (isLoading === 'loading') {
        return null
    }

    if (isAuth) {
        return (
            <Redirect
                to={(typeof location.state !== undefined)?location.state.from:'/'}
            />
        )
    }

    return (
        <div className={styles.wrap + " pt-20"}>
            <p className="text text_type_main-medium pb-10">Вход</p>
            <form onSubmit={onSubmitHandle} className={styles.form}>
                <Input type={'text'} placeholder={'E-mail'} onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} ref={inputEmailRef} size={'default'} /><br />
                <Input icon={typePassword.icon} type={typePassword.type} placeholder={'Пароль'} onChange={e => setValuePassword(e.target.value)} onIconClick={showPassword} value={valuePassword} name={'password'} ref={inputPasswordRef} size={'default'} /><br />
                <Button type="primary" size="medium">Войти</Button>
            </form>
            <p className="text text_type_main-default pt-20">Вы - новый пользователь? <Link className={styles.link} to={{ pathname: `/register/` }}>Зарегистрироваться</Link></p>
            <p className="text text_type_main-default">Забыли пароль? <Link className={styles.link} to={{ pathname: `/forgot-password/` }}>Восстановить пароль</Link></p>
        </div>
    )
}


