import React, {useState, useRef} from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom'
import styles from './login.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {loginUser} from "../services/slices/user";
import {useDispatch, useSelector} from '../services/hooks';
import {TPassword} from "../types";
import {RootState} from "../services/reducers";

type TLocationState = {
    from: string
}

export const LoginPage = () => {
    const [valueEmail, setValueEmail] = useState<string>('')
    const [valuePassword, setValuePassword] = useState<string>('')
    const [typePassword, setTypePassword] = useState<TPassword>({type:'password', icon:'ShowIcon'})
    const inputEmailRef = useRef<HTMLInputElement>(null)
    const inputPasswordRef = useRef<HTMLInputElement>(null)
    const location = useLocation<TLocationState>();
    const showPassword = ():void => {
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
            let email = inputEmailRef.current.value;
            let password = inputPasswordRef.current.value;
            dispatch(loginUser(JSON.stringify({
                email: email,
                password: password,
            })));
        }
    }

    const isLoading = useSelector((store: RootState) => store.user.loading)
    const isAuth = useSelector((store: RootState) => !!store.user.data)

    if (isLoading === 'loading') {
        return null
    }

    if (isAuth) {
        return (
            <Redirect to={(location.state) ? location.state.from : '/'} />
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
