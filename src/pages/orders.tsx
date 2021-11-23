import React, {useEffect} from 'react';
import {useDispatch} from '../services/hooks';
import OrdersList from "../components/orders-list/orders-list";
import {connect, disconnect} from "../services/actions";
import {getCookie} from "../utils/utils";

export function OrdersPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connect("wss://norma.nomoreparties.space/orders?token=" + getCookie('accessToken')))
        return () => {
            dispatch(disconnect())
        };
    }, [dispatch]);

    return (
        <OrdersList />
    )
}


