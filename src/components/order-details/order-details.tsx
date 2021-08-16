import React from 'react';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-details.module.css'
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers";

function OrderDetails() {
    const order = useSelector((store: RootState) => store.order.order)
    const number = (order.order !== undefined) ? order.order.number : '----'

    return (
        <div className={styles.wrap}>
            <span className="text text_type_digits-large">{number}</span>
            <span className="text text_type_main-default mt-8 mb-15">идентификатор заказа</span>
            <CheckMarkIcon type="primary" />
            <span className={styles.text + " text text_type_main-default mt-15"}>Ваш заказ начали готовить</span>
            <span className={styles.text + " text text_type_main-default text_color_inactive mt-2 mb-30"}>Дождитесь готовности на орбиральной станции</span>
        </div>
    )
}

export default OrderDetails;
