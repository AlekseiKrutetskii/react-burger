
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import {useParams} from "react-router-dom";
import {OrderStatus, TOrder} from "../../types/orders";
import React, {useEffect, useState} from "react";
import styles from "./order.module.css";
import moment from "moment";
import 'moment/locale/ru';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TEntity} from "../../types";
import {connect, disconnect} from "../../services/actions";
import {fetchIngredients} from "../../services/slices/ingredients";

type TRouteParams = {
    id: string;
}

export const Order:React.FC = () => {
    const[order, setOrder] = useState<TOrder|null>(null);
    const isLoading = useSelector((store: RootState) => store.ingredients.loading)
    const data:Array<TOrder>|null = useSelector((store: RootState) => store.orders.orders)
    const dataIng:Array<TEntity> = useSelector((store: RootState) => store.ingredients.entities)
    let { id } = useParams<TRouteParams>();
    let price = 0;
    moment.locale('RU');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
        dispatch(connect("wss://norma.nomoreparties.space/orders/all"))
        return () => {
            dispatch(disconnect())
        };
    }, [dispatch]);

    useEffect(()=>{
        data?.filter(item => item._id === id).map(item =>
            setOrder(item)
        )
    }, [data, id])

    if (isLoading === 'loading' || !order) {
        return null
    }

    return (
        <div className={styles.wrap}>
            <section className={`pt-4 pl-4 pr-4 pb-4  ${styles.order}`}>
                <span className={`text text_type_digits-default mb-10 ${styles.center}`}>#{order.number}</span>
                <span className={`mb-2 text text_type_main-medium mb-3`}>{order.name}</span>
                <span className={`mb-6 text text_type_main-default mb-15 ${(order.status === 'done')? styles.done : '' }`}>{OrderStatus[order.status]}</span>
                <span className={`mb-2 text text_type_main-medium mb-6`}>Состав:</span>
                <div className={styles['item-wrap']}>
                    {data && order.ingredients.map(
                        ing =>
                            dataIng.filter(ingdata => ingdata._id === ing)
                                .map(it => {
                                        price += it.price * ((it.type === 'bun')?2:1);
                                        return (
                                            <div key={it._id} className={`mb-4 ${styles.ing}`}>
                                                <div className={styles.icon}><img className={`pl-4 pr-4 mb-1 ${styles.image}`} src={it.image} alt={it.name}/></div>
                                                <div className={`mb-2 mr-4 ml-4`}><span className={`text text_type_main-default`}>{it.name}</span></div>
                                                <div className={`mr-4 ${styles.price}`}><span className="text text_type_digits-default mr-4 mb-1 price">{(it.type === 'bun')?2:1} x {it.price}</span> <CurrencyIcon type="primary" /></div>
                                            </div>
                                        )
                                    }
                                )
                    )
                    }
                </div>
                <div className={`mt-10 ${styles.bottom}`}>
                    <span className={`text text_type_main-default text_color_inactive ${styles.date}`}>{moment(order.createdAt).format('HH:mm:ss d MMM')}</span>
                    <span className="text text_type_digits-default mb-1 price">{price} <CurrencyIcon type="primary" /></span>
                </div>

            </section>
        </div>
    )
}


