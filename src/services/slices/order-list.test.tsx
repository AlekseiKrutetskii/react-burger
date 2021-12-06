import {
    ordersListActions,
    ordersListReducer
} from './orders-list';

import {WebsocketStatus} from "../../types/orders";

describe('currentSlice', () => {
    describe('reducers', () => {
        const initialState = {
            status: WebsocketStatus.OFFLINE,
            connectionError: '',
            orders: null,
            total: 0,
            totalToday: 0, }

        const payloadState = {
            success: true,
            orders: [
                {
                    ingredients: ['first', 'second'],
                    _id: 'string',
                    status: 'done',
                    number: 123,
                    createdAt: 'string',
                    updatedAt: 'string',
                    name: 'Order name'
                }
            ],
            total: 1,
            totalToday: 1
        }

        it('test initialstate constructor', () => {
            expect(ordersListReducer(undefined, {type: ''})).toEqual(initialState);
        });

        it('sets the status to OFFLINE', () => {
            const action = { type: ordersListActions.wsClose  };
            const state = ordersListReducer(initialState, action);
            expect(state).toEqual(initialState);
        });

        it('sets the cur to payload', () => {
            const action = { type: ordersListActions.wsMessage, payload: payloadState  };
            const state = ordersListReducer(initialState, action);
            expect(state).toEqual({...initialState, orders: payloadState.orders, total: 1, totalToday: 1});
        });

        it('sets the status and connectionError to ONLINE', () => {
            const action = { type: ordersListActions.wsError, payload: 'Some error'};
            const state = ordersListReducer(initialState, action);
            expect(state).toEqual({...initialState, status: WebsocketStatus.ONLINE, connectionError: 'Some error'});
        });

        it('sets the status to ONLINE', () => {
            const action = { type: ordersListActions.wsOpen };
            const state = ordersListReducer(initialState, action);
            expect(state).toEqual({...initialState, status: WebsocketStatus.ONLINE});
        });
    });

});