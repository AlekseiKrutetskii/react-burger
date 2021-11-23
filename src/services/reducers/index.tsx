import { combineReducers } from 'redux';
import { ingredients } from '../slices/ingredients'
import { current } from '../slices/current'
import { order } from '../slices/order'
import {constructors} from "../slices/constructors";
import {user} from "../slices/user"
import {connectRouter, routerMiddleware} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import {configureStore} from "@reduxjs/toolkit";
import {socketMiddleware} from "../middleware/orders-socket-middleware";
import {ordersListActions, ordersListReducer} from "../slices/orders-list";
import {connect, disconnect} from "../actions";

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
    ingredients: ingredients.reducer,
    constructors: constructors.reducer,
    current: current.reducer,
    order: order.reducer,
    user: user.reducer,
    router: connectRouter(history),
    orders: ordersListReducer
});

const {wsOpen, wsClose, wsMessage, wsError} = ordersListActions;

const ordersListAction = {
    wsConnect: connect,
    wsDisconnect: disconnect,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
}

const ordersMiddleware = socketMiddleware(ordersListAction);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(ordersMiddleware).concat(routerMiddleware(history))
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType <typeof rootReducer>
