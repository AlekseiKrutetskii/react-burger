import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={`pt-4 pb-4 ${styles.header}`}>
            <nav>
                <ul className={styles.nav}>
                    <li className="mr-2"><a href="/" className={`pl-5 pr-5 ${styles['nav-item']}`}><BurgerIcon type="primary" /><span className="pl-2 text text_type_main-default">Конструктор</span></a></li>
                    <li><a href="/" className={`pl-5 pr-5 ${styles['nav-item']}`}><ListIcon type="secondary" /><span className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</span></a></li>
                </ul>
            </nav>
            <Logo />
            <a href="/" className={`pl-5 pr-5 ${styles['nav-item']}`}><ProfileIcon type="secondary" /><span className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</span></a>
        </header>
    )
}

export default AppHeader;
