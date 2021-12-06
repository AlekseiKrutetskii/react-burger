import reducer, {
    registerUser, getUser, loginUser, logoutUser, userAction
} from './user';

import {WebsocketStatus} from "../../types/orders";

describe('userSlice', () => {
    describe('reducers', () => {
        const initialState = {
            data: null,
            loading: 'idle'
        }

        const payloadUserState = {
            email: 'string',
            name: 'string',
        }

        const payloadState = {
            user: payloadUserState,
            accessToken: 'string',
            success: true
        }

        it('test initialstate user', () => {
            expect(reducer(undefined, {type: ''})).toEqual(initialState);
        });

        it('sets the data on setUserData', () => {
            const action = { type: userAction.setUserData.type, payload: payloadUserState  };
            const state = reducer(initialState, action);
            expect(state).toEqual({...initialState, data: payloadUserState});
        });

        it('sets data when registerUser is fulfilled', () => {
            const action = { type: registerUser.fulfilled.type, payload: payloadState  };
            const state = reducer(initialState, action);
            expect(state).toEqual({...initialState, data: payloadState.user});
        });

        it('sets data when loginUser is fulfilled', () => {
            const action = { type: loginUser.fulfilled.type, payload: payloadState  };
            const state = reducer(initialState, action);
            expect(state).toEqual({...initialState, data: payloadState.user});
        });

        it('sets the loading  when getUser is pending', () => {
            const action = { type: getUser.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({...initialState, loading: 'loading'});
        });

        it('sets the data and loading  when getUser is fulfilled', () => {
            const action = { type: getUser.fulfilled.type, payload: payloadState};
            const state = reducer(initialState, action);
            expect(state).toEqual({data: payloadState.user, loading: 'idle'});
        });

        it('sets the loading  when getUser is rejected', () => {
            const action = { type: getUser.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({...initialState, loading: 'idle'});
        });

        it('sets the loading  when logoutUser is pending', () => {
            const action = { type: logoutUser.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({...initialState, loading: 'loading'});
        });

        it('sets the data and loading when logoutUser is fulfilled success', () => {
            const action = { type: logoutUser.fulfilled.type, payload: payloadState};
            const state = reducer(initialState, action);
            expect(state).toEqual({data: null, loading: 'idle'});
        });

        it('sets the data and loading when logoutUser is fulfilled error', () => {
            const action = { type: logoutUser.fulfilled.type, payload: {...payloadState, success: false}};
            const state = reducer({data: payloadState.user, loading: 'idle'}, action);
            expect(state).toEqual({data: payloadUserState, loading: 'idle'});
        });

        it('sets the loading  when logoutUser is rejected', () => {
            const action = { type: logoutUser.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({...initialState, loading: 'idle'});
        });
    });
});