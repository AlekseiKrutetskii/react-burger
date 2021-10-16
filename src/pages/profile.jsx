import React, {useState, useRef} from 'react';
import styles from './profile.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useRouteMatch, Switch, Route, Link} from "react-router-dom";
import ProtectedRoute from "../components/protected-route/protected-route";
import {logoutUser, setUserData} from "../services/slices/user";
import {useDispatch, useSelector} from "react-redux";
import {fetchWithRefresh, getCookie} from "../utils/utils";

export function ProfilePage() {
    const curName = useSelector((store) => store.user.data.name)
    const curEMail = useSelector((store) => store.user.data.email)
    const [valueName, setValueName] = useState(curName)
    const [valueEmail, setValueEmail] = useState(curEMail)
    const [valuePassword, setValuePassword] = useState('')
    const [typePassword, setTypePassword] = useState({type:'password', icon:'ShowIcon'})
    const inputNameRef = useRef(null)
    const inputEmailRef = useRef(null)
    const inputPasswordRef = useRef(null)
    const dispatch = useDispatch()

    const { url, path } = useRouteMatch();

    const showPassword = () => {
        if (typePassword.type === 'text') {
            setTypePassword({type:'password', icon: 'ShowIcon'});
        } else {
            setTypePassword({type:'text', icon: 'HideIcon'});
        }
    }

    const handleOnClick = () => {
        setValueName(curName)
        setValueEmail(curEMail)
        setValuePassword('')
    }

    const singOut = () => {
        dispatch(logoutUser(JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        })));
    }

    const updateUser = () => {
        fetchWithRefresh ('https://norma.nomoreparties.space/api/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({name: valueName, email: valueEmail, password: valuePassword})
        })
            .then(data => {
                console.log(data)
                setUserData(data.user)
            })
            .catch(() => console.log('some error'))
    }

    return (
        <div className={styles.wrap + " pt-20"}>
            <div className={styles.side}>

                    <ul className={styles.nav}>
                        <li className="mb-5"><NavLink className={styles.link + " text text_type_main-medium"} exact activeClassName={styles.active} to={{ pathname: url }}>Профиль</NavLink></li>
                        <li className="mb-5"><NavLink className={styles.link + " text text_type_main-medium"} activeClassName={styles.active} to={{ pathname: `${url}/history/` }}>История заказов</NavLink></li>
                        <li><Link className={styles.link + " text text_type_main-medium"} onClick={singOut} to="/login">Выход</Link></li>
                    </ul>
                    <p className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
            </div>
            <Switch>
                <ProtectedRoute path={`${path}/history/`} exact={true}>
                    <></>
                </ProtectedRoute>
                <Route>
                    <div className={styles.form + " pb-20"}>
                        <Input type={'text'} placeholder={'Имя'} onChange={e => setValueName(e.target.value)} value={valueName} name={'name'} ref={inputNameRef} size={'default'} /><br />
                        <Input type={'text'} placeholder={'E-mail'} onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} ref={inputEmailRef} size={'default'} /><br />
                        <Input icon={typePassword.icon} type={typePassword.type} placeholder={'Пароль'} onChange={e => setValuePassword(e.target.value)} onIconClick={showPassword} value={valuePassword} name={'password'} ref={inputPasswordRef} size={'default'} /><br />
                        <p className="text text_type_main-default">
                            <span className={styles.button + " mr-10"} onClick={handleOnClick}>Отмена</span>
                            <Button type="primary" size="medium" onClick={updateUser}>
                                Сохранить
                            </Button>
                        </p>
                    </div>
                </Route>
            </Switch>

        </div>
    )
}


