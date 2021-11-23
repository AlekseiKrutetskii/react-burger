import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import OrdersList from "../components/orders-list/orders-list";
import {connect, disconnect} from "../services/actions";
import styles from "./feed.module.css";
import {RootState} from "../services/reducers";
import {ordersListState} from "../services/slices/orders-list";

export function FeedPage() {
    const dispatch = useDispatch();
    const data:ordersListState = useSelector((store: RootState) => store.orders)

    useEffect(() => {
        dispatch(connect("wss://norma.nomoreparties.space/orders/all"))
        return () => {
            dispatch(disconnect())
        };
    }, [dispatch]);

    return (
        <div className={`${styles.flex}`}>
            <div className={`pt-10 mr-8 ${styles.side}`}>
                <p className="text text_type_main-large mb-5">Лента заказа</p>
                <OrdersList />
            </div>
            <div className={`pt-10 ${styles.flexc}`}>
                <div className={`${styles.info}`}>
                    <div>
                        <span className={`text text_type_main-medium`}>Готовы:</span>
                        <div className="pt-6">
                            {
                                data.orders?.filter((item, i) => item.status === 'done' && i < 10).map(item => {
                                    return (
                                        <div key={item._id} className={`mb-2 text text_type_digits-default ${styles.done}`}>{item.number}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <span className={`mb-6 text text_type_main-medium`}>В работе:</span>
                        <div className="pt-6">
                            {
                                data.orders?.filter(item => item.status === 'pending').map(item => {
                                    return (
                                        <div key={item._id} className={`mb-2 text text_type_digits-default`}>{item.number}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <span className={`mt-15 text text_type_main-medium`}>Выполнено за все время:</span>
                <span className={`text text_type_digits-large`}>{data.total}</span>
                <span className={`mt-15 text text_type_main-medium`}>Выполнено за сегодня:</span>
                <span className={`text text_type_digits-large`}>{data.totalToday}</span>
            </div>
        </div>

    )
}


