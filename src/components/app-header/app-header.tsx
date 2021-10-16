import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {useRouteMatch} from "react-router-dom";

function AppHeader() {
    const isConstructor = !!useRouteMatch({ path: '/', exact: true});
    const isFeed = !!useRouteMatch('/feed');
    const isProfile = !!useRouteMatch('/profile');

    return (
        <header className={`pt-4 pb-4 ${styles.header}`}>
            <nav>
                <ul className={styles.nav}>
                    <li className="mr-2"><a href="/" className={`pl-5 pr-5 ${styles['nav-item']}`}><BurgerIcon type={isConstructor?'primary':'secondary'} /><span className={`pl-2 text text_type_main-default ${isConstructor?'':' text_color_inactive'}`}>Конструктор</span></a></li>
                    <li><a href="/" className={`pl-5 pr-5 ${styles['nav-item']}`}><ListIcon type={isFeed?'primary':'secondary'} /><span className={`pl-2 text text_type_main-default ${isFeed?'':' text_color_inactive'}`}>Лента заказов</span></a></li>
                </ul>
            </nav>
            <Logo />
            <a href="/profile" className={`pl-5 pr-5 ${styles['nav-item']}`}><ProfileIcon type={isProfile?'primary':'secondary'} /><span className={`pl-2 text text_type_main-default ${isProfile?'':' text_color_inactive'}`}>Личный кабинет</span></a>
        </header>
    )
}

export default AppHeader;
