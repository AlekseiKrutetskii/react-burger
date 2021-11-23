import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TEntity} from "../../types";

type TCurrentState = {
    cur: TEntity|null
}

const initialState:TCurrentState = {
    cur: null
}

export const current = createSlice({
    name: 'current',
    initialState,
    reducers: {
        add: (state, action:PayloadAction<TEntity>) => {
            state.cur = action.payload
        },
        del: state => {
            state.cur = null
        }
    }
});

export const { add, del } = current.actions;
export default current.reducer;