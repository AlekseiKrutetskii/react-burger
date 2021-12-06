import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {useRouteMatch, Link} from "react-router-dom";

const AppHeader = () => {
    const isConstructor = !!useRouteMatch({ path: '/', exact: true});
    const isFeed = !!useRouteMatch('/feed');
    const isProfile = !!useRouteMatch('/profile');

    return (
        <header className={`pt-4 pb-4 ${styles.header}`}>
            <nav>
                <ul className={styles.nav}>
                    <li className="mr-2"><Link data-testid="mainpage" to="/" className={`pl-5 pr-5 ${styles['nav-item']}`}><BurgerIcon type={isConstructor?'primary':'secondary'} /><span className={`pl-2 text text_type_main-default ${isConstructor?'':' text_color_inactive'}`}>Конструктор</span></Link></li>
                    <li><Link to="/feed/" className={`pl-5 pr-5 ${styles['nav-item']}`}><ListIcon type={isFeed?'primary':'secondary'} /><span className={`pl-2 text text_type_main-default ${isFeed?'':' text_color_inactive'}`}>Лента заказов</span></Link></li>
                </ul>
            </nav>
            <Link to='/'><Logo /></Link>
            <Link to="/profile" className={`pl-5 pr-5 ${styles['nav-item']}`}><ProfileIcon type={isProfile?'primary':'secondary'} /><span className={`pl-2 text text_type_main-default ${isProfile?'':' text_color_inactive'}`}>Личный кабинет</span></Link>
        </header>
    )
}

export default AppHeader;
