import React from 'react';
import styles from './orders-list.module.css';
import {useSelector} from '../../services/hooks';
import {RootState} from "../../services/reducers";
import OrdersListItem from "./orders-list-item";
import {TOrder} from "../../types/orders";

const OrdersList:React.FC = () => {
    const orders:Array<TOrder>|null = useSelector((store: RootState) => store.orders.orders);

    return (
        <section className={`${styles.orders}`}>
            <div className={styles['item-wrap']}>
                <div className={styles.items}>
                    <div className={`mb-10 pr-4 ${styles['item-subwrap']}`}>
                        {orders?.map(item =>
                                <OrdersListItem key={item._id} item={item} />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrdersList;