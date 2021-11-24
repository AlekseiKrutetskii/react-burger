import React from 'react';
import styles from './orders-list-item.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, Link} from "react-router-dom";
import {OrderStatus, TOrder} from "../../types/orders";
import {TEntity, TLocationState} from "../../types";
import {useSelector} from '../../services/hooks';
import {RootState} from "../../services/reducers";
import moment from 'moment'
import 'moment/locale/ru';

type TOrderListItemProps = {
    item: TOrder
}

const OrderListItem:React.FC<TOrderListItemProps> = ({item}) => {
    let price = 0;
    const location = useLocation<TLocationState>();
    const data:Array<TEntity> = useSelector((store: RootState) => store.ingredients.entities)
    moment.locale('RU');

    return (
        <div className={`pl-6 pt-6 pb-6 mb-6 ${styles.item}`} data-item={JSON.stringify(item)}>
            <Link className={styles.link}
                key={item._id}
                to={{
                    pathname: `${location.pathname}${item._id}`,
                    // This is the trick! This link sets
                    // the `background` in location state.
                    state: { background: location }
                }}
            >
                <div className={`mb-6 pr-6 ${styles.block}`}>
                    <span className="text text_type_digits-default">#{item.number}</span>
                    <span className={`text text_type_main-default text_color_inactive ${styles.date}`}>{moment(item.createdAt).format('HH:mm:ss d MMM')}</span>
                </div>
                <span className="mb-2 text text_type_main-medium">{item.name}</span>
                <span className={`mb-6 text text_type_main-default ${(item.status === 'done')? styles.done : '' }`}>{OrderStatus[item.status]}</span>
                <div className={`pr-6 ${styles.block}`}>
                    <div className={`pl-3 ${styles.wrap}`}>
                        {item.ingredients.map(
                            ing =>
                                data.filter(ingdata => ingdata._id === ing)
                                    .map(it => {
                                        price += it.price * ((it.type === 'bun')?2:1);
                                                           return (
                                            <div key={it._id} className={styles.icon}><img className={`pl-4 pr-4 mb-1 ${styles.image}`}
                                                                              src={it.image} alt={it.name}/></div>
                                            )
                                        }
                                    )
                            )
                        }
                    </div>
                    <span className="text text_type_digits-default mb-1 price">{price} <CurrencyIcon type="primary" /></span>
                </div>
            </Link>
        </div>
    )
}

export default OrderListItem;
