import { createSlice } from '@reduxjs/toolkit';

export const current = createSlice({
    name: 'current',
    initialState: {
        cur: {}
    },
    reducers: {
        add: (state, action) => {
            state.cur = action.payload
        },
        del: state => {
            state.cur = {}
        }
    }
});

export const { add, del } = current.actions;
export default current.reducer;