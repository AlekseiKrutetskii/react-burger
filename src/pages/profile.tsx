import React, {useState, useRef, useEffect} from 'react';
import styles from './profile.module.css'
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useRouteMatch, Switch, Route, Link} from "react-router-dom";
import ProtectedRoute from "../components/protected-route/protected-route";
import {logoutUser, setUserData} from "../services/slices/user";
import {useDispatch, useSelector} from '../services/hooks';
import {fetchWithRefresh, getCookie} from "../utils/utils";
import {apiURL} from "../utils/data";
import {TPassword} from "../types";
import {OrdersPage} from "./orders";
import {RootState} from "../services/reducers";

export function ProfilePage() {
    const curUser = useSelector((store: RootState) => store.user.data);
    const [valueName, setValueName] = useState<string>('')
    const [valueEmail, setValueEmail] = useState<string>('')
    const [valuePassword, setValuePassword] = useState<string>('')
    const [typePassword, setTypePassword] = useState<TPassword>({type:'password', icon:'ShowIcon'})
    const inputNameRef = useRef<HTMLInputElement>(null)
    const inputEmailRef = useRef<HTMLInputElement>(null)
    const inputPasswordRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    const { url, path } = useRouteMatch();

    useEffect(()=>{
        setValueName((curUser)?curUser.name:'')
        setValueEmail((curUser)?curUser.email:'')
    }, [curUser])

    const showPassword = ():void => {
        if (typePassword.type === 'text') {
            setTypePassword({type:'password', icon: 'ShowIcon'});
        } else {
            setTypePassword({type:'text', icon: 'HideIcon'});
        }
    }

    const handleOnClick = ():void => {
        setValueName((curUser)?curUser.name:'')
        setValueEmail((curUser)?curUser.email:'')
        setValuePassword('')
    }

    const singOut = ():void => {
        dispatch(logoutUser(JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        })));
    }

    const onSubmitHandle = (e):void => {
        e.preventDefault()
        fetchWithRefresh(apiURL+'auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({name: valueName, email: valueEmail, password: valuePassword})
        })
        .then(data => {
            setUserData(data.user)
        })
        .catch(() => console.log('some error'))
    }

    return (
        <div className={styles.wrap + " pt-20"}>
            <div className={styles.side}>

                    <ul className={styles.nav}>
                        <li className="mb-5"><NavLink className={styles.link + " text text_type_main-medium"} exact activeClassName={styles.active} to={{ pathname: url }}>Профиль</NavLink></li>
                        <li className="mb-5"><NavLink className={styles.link + " text text_type_main-medium"} activeClassName={styles.active} to={{ pathname: `${url}/orders/` }}>История заказов</NavLink></li>
                        <li><Link className={styles.link + " text text_type_main-medium"} onClick={singOut} to="/login">Выход</Link></li>
                    </ul>
                    <p className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
            </div>
            <div className={styles.page}>
                <Switch>
                    <ProtectedRoute path={`${path}/orders`} exact={true}>
                        <OrdersPage />
                    </ProtectedRoute>
                    <Route path={`${path}`} exact={true}>
                        <form onSubmit={onSubmitHandle} className={styles.form + " pb-20"}>
                            <Input type={'text'} placeholder={'Имя'} onChange={e => setValueName(e.target.value)} value={valueName} name={'name'} ref={inputNameRef} size={'default'} /><br />
                            <Input type={'text'} placeholder={'E-mail'} onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} ref={inputEmailRef} size={'default'} /><br />
                            <Input icon={typePassword.icon} type={typePassword.type} placeholder={'Пароль'} onChange={e => setValuePassword(e.target.value)} onIconClick={showPassword} value={valuePassword} name={'password'} ref={inputPasswordRef} size={'default'} /><br />
                            <p className="text text_type_main-default">
                                <span className={styles.button + " mr-10"} onClick={handleOnClick}>Отмена</span>
                                <Button type="primary" size="medium">Сохранить</Button>
                            </p>
                        </form>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}


