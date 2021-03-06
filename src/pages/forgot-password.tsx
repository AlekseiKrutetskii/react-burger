import React, {useState, useRef} from 'react';
import {Link, Redirect} from 'react-router-dom'
import styles from './forgot-password.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from '../services/hooks';
import {RootState} from "../services/reducers";
import {forgotPassword} from "../utils/utils";

export function ForgotPasswordPage() {
    const [valueEmail, setValueEmail] = useState('')
    const [errorText, setErrorText] = useState('')
    const [error, setError] = useState(false)
    const inputEmailRef = useRef(null)

    const handleOnChange = (e) => {
        setValueEmail(e.target.value);
        handleOnBlur(e);
    }

    const handleOnBlur = ( e ) => {
        let email = e.target.value;
        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(email) ) {
            setErrorText('');
            setError(false);
        }
        else {
            // invalid email, maybe show an error to the user.
            setErrorText('Некорректный e-mail');
            setError(true);
        }
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
            <p className="text text_type_main-medium pb-10">Восстановление пароля</p>
            <form onSubmit={e => forgotPassword(e,error,valueEmail)} className={styles.wrap}>
                <Input type={'text'} placeholder={'Укажите e-mail'} error={error} errorText={errorText} onChange={handleOnChange} onBlur={handleOnBlur} value={valueEmail} name={'email'} ref={inputEmailRef} size={'default'} /><br />
                <Button type="primary" size="medium">Восстановить</Button>
            </form>
            <p className="text text_type_main-default pt-20">Вспомнили пароль? <Link className={styles.link} to={{ pathname: `/login/` }}>Войти</Link></p>
        </div>
    )
}


