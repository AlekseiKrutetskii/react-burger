import React, {useState, useRef} from 'react';
import {Link, Redirect} from 'react-router-dom'
import styles from './register.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../services/slices/user";

export function RegisterPage() {
    const [valueName, setValueName] = useState('')
    const [valueEmail, setValueEmail] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [typePassword, setTypePassword] = useState({type:'password', icon:'ShowIcon'})
    const inputNameRef = useRef(null)
    const inputEmailRef = useRef(null)
    const inputPasswordRef = useRef(null)

    const dispatch = useDispatch();
    const showPassword = () => {
        if (typePassword.type === 'text') {
            setTypePassword({type:'password', icon: 'ShowIcon'});
        } else {
            setTypePassword({type:'text', icon: 'HideIcon'});
        }
    }

    const onClickHandle = () => {
        dispatch(registerUser(JSON.stringify({
            email: inputEmailRef.current.value,
            password: inputPasswordRef.current.value,
            name: inputNameRef.current.value,
        })))
    }

    const isLoading = useSelector((store) => store.user.loading)
    const isAuth = useSelector((store) => !!store.user.data)

    if (isLoading === 'loading') {
        return null
    }

    if (isAuth) {
        return (
            <Redirect
                to='/'
            />
        )
    }

    return (
        <div className={styles.wrap + " pt-20"}>
            <p className="text text_type_main-medium pb-10">Регистрация</p>
            <Input type={'text'} placeholder={'Имя'} onChange={e => setValueName(e.target.value)} value={valueName} name={'name'} ref={inputNameRef} size={'default'} /><br />
            <Input type={'text'} placeholder={'E-mail'} onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} ref={inputEmailRef} size={'default'} /><br />
            <Input icon={typePassword.icon} type={typePassword.type} placeholder={'Пароль'} onChange={e => setValuePassword(e.target.value)} onIconClick={showPassword} value={valuePassword} name={'password'} ref={inputPasswordRef} size={'default'} /><br />
            <Button type="primary" size="medium" onClick={onClickHandle}>
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default pt-20">Уже харегистрированы? <Link className={styles.link} to={{ pathname: `/login/` }}>Войти</Link></p>
        </div>
    )
}


