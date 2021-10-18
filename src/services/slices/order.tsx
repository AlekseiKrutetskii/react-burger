import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchWithRefresh, getCookie} from "../../utils/utils";
import {apiURL} from "../../utils/data";

interface OrderState {
    order: any,
    loading: string
}

const initialState: OrderState = {
    order: {},
    loading: 'idle'
}

export const sendOrder = createAsyncThunk(
    'order/sendOrder',
    async (ingredients:any) => {

        const token = getCookie('accessToken');
        if (token) {
            const data = fetchWithRefresh(apiURL+'orders',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + getCookie('accessToken')
                    },
                    body: ingredients
                })
            return data
        }
        return Promise.reject("Нет токена");
    }
)

// Then, handle actions in your reducers:
export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(sendOrder.pending, (state) => {
            state.loading = 'loading'
        });
        builder.addCase(sendOrder.fulfilled, (state, action) => {
            state.order = action.payload
            state.loading = 'idle'
        });
        builder.addCase(sendOrder.rejected, (state) => {
            state.loading = 'idle'
        })
    },
})