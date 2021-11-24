import React, {useState, useRef} from 'react';
import {Link, Redirect} from 'react-router-dom'
import styles from './register.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from '../services/hooks';
import {registerUser} from "../services/slices/user";
import {TPassword} from "../types";
import {RootState} from "../services/reducers";

export function RegisterPage() {
    const [valueName, setValueName] = useState<string>('')
    const [valueEmail, setValueEmail] = useState<string>('')
    const [valuePassword, setValuePassword] = useState<string>('')
    const [typePassword, setTypePassword] = useState<TPassword>({type:'password', icon:'ShowIcon'})
    const inputNameRef = useRef<HTMLInputElement>(null)
    const inputEmailRef = useRef<HTMLInputElement>(null)
    const inputPasswordRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch();
    const showPassword = () => {
        if (typePassword.type === 'text') {
            setTypePassword({type:'password', icon: 'ShowIcon'});
        } else {
            setTypePassword({type:'text', icon: 'HideIcon'});
        }
    }

    const onSubmitHandle = (e):void => {
        e.preventDefault()
        dispatch(registerUser(JSON.stringify({
            email: (inputEmailRef.current !== null)?inputEmailRef.current.value:'',
            password: (inputPasswordRef.current !== null)?inputPasswordRef.current.value:'',
            name: (inputNameRef.current !== null)?inputNameRef.current.value:'',
        })))
    }

    const isLoading = useSelector((store: RootState) => store.user.loading)
    const isAuth = useSelector((store: RootState) => !!store.user.data)

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
            <form onSubmit={onSubmitHandle} className={styles.wrap}>
                <Input type={'text'} placeholder={'Имя'} onChange={e => setValueName(e.target.value)} value={valueName} name={'name'} ref={inputNameRef} size={'default'} /><br />
                <Input type={'text'} placeholder={'E-mail'} onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} ref={inputEmailRef} size={'default'} /><br />
                <Input icon={typePassword.icon} type={typePassword.type} placeholder={'Пароль'} onChange={e => setValuePassword(e.target.value)} onIconClick={showPassword} value={valuePassword} name={'password'} ref={inputPasswordRef} size={'default'} /><br />
                <Button type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <p className="text text_type_main-default pt-20">Уже харегистрированы? <Link className={styles.link} to={{ pathname: `/login/` }}>Войти</Link></p>
        </div>
    )
}


