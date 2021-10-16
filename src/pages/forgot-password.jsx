import React, {useState, useRef} from 'react';
import {Link, Redirect} from 'react-router-dom'
import styles from './forgot-password.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {history} from "../services/reducers";

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

    const onClick = async () => {
        if (!error && valueEmail !== '') {
            localStorage.setItem('forgot', true)

            await fetch('https://norma.nomoreparties.space/api/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: valueEmail})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.success?'ok':'error')
                history.push('/reset-password')
            })
                .catch(() => console.log('some error'))
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
                to='/'
            />
        )
    }

    return (
        <div className={styles.wrap + " pt-20"}>
            <p className="text text_type_main-medium pb-10">Восстановление пароля</p>
            <Input type={'text'} placeholder={'Укажите e-mail'} error={error} errorText={errorText} onChange={handleOnChange} onBlur={handleOnBlur} value={valueEmail} name={'email'} ref={inputEmailRef} size={'default'} /><br />
            <Button type="primary" size="medium" onClick={onClick}>Восстановить</Button>
            <p className="text text_type_main-default pt-20">Вспомнили пароль? <Link className={styles.link} to={{ pathname: `/login/` }}>Войти</Link></p>
        </div>
    )
}


