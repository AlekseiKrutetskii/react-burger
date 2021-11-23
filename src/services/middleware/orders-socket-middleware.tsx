import {ActionCreatorWithPayload, ActionCreatorWithoutPayload} from '@reduxjs/toolkit'
import {Middleware} from 'redux'
import {RootState} from "../reducers";

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsAction: TwsActionTypes): Middleware<{}, RootState> => {
    return (store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { payload } = action;
            const {wsConnect,wsDisconnect,wsSendMessage,onOpen,onClose,onError,onMessage} = wsAction;

            console.log(action)

            if (wsConnect.match(action)) {
                console.log('connect')
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = event => {
                    console.log('open')
                    dispatch(onOpen());
                };
                socket.onerror = event => {
                    console.log('error')
                    dispatch(onError("WebSocket error observed:" + event));
                };
                socket.onmessage = event => {
                    console.log('message')
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessage(parsedData));
                };
                socket.onclose = event => {
                    console.log('close')
                    dispatch(onClose());
                };

                if (wsSendMessage?.match(action)) {
                    socket.send(JSON.stringify(payload));
                }

                if (wsDisconnect.match(action)) {
                    socket.close();
                }
            }
            next(action);
        };
    });
};