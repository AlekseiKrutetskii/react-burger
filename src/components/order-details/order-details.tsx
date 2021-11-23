import React, {useEffect} from 'react';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-details.module.css'
import {useDispatch, useSelector} from '../../services/hooks';
import {RootState} from "../../services/reducers";
import {constructors} from "../../services/slices/constructors";



const OrderDetails:React.FC = () => {
    const dispatch = useDispatch();
    const order = useSelector((store: RootState) => store.order.order)
    var number = '----';
    if (order && order.order !== undefined) {
        number = order.order.number.toString()
    }
    useEffect(() => {
        return () => {
            dispatch(constructors.actions.clear());
        }
    }, [dispatch])

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
