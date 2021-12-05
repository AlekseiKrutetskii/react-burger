import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TOrder, TOrdersList, WebsocketStatus} from "../../types/orders";

export type ordersListState = {
    status: WebsocketStatus,
    connectionError: string,
    orders: Array<TOrder> | null,
    total: number,
    totalToday: number
}

const initialState:ordersListState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    orders: null,
    total: 0,
    totalToday: 0,
}

export const ordersList = createSlice({
    name: 'orderslist',
    initialState,
    reducers: {
        wsOpen: state => {
            state.status = WebsocketStatus.ONLINE
        },
        wsClose: state => {
            state.status = WebsocketStatus.OFFLINE
        },
        wsMessage: (state, action:PayloadAction<TOrdersList>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        wsError: (state, action:PayloadAction<string>) => {
            state.status = WebsocketStatus.ONLINE
            state.connectionError = action.payload
            state.orders = null
            state.total = 0
            state.totalToday = 0
        }
    }
});

export const ordersListActions = ordersList.actions;
export const ordersListReducer = ordersList.reducer;