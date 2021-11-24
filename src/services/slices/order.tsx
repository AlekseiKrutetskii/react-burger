import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchWithRefresh, getCookie} from "../../utils/utils";
import {apiURL} from "../../utils/data";
import {TEntity} from "../../types";

type TOrderOwner = {
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
}

type TOrderInfo = {
    ingredients: Array<TEntity>,
    _id: string,
    owner: TOrderOwner,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    price: number,
}

type TOrder = {
    success: boolean,
    name: string,
    order: TOrderInfo
}

interface OrderState {
    order: TOrder|null,
    loading: string
}

const initialState: OrderState = {
    order: null,
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
        builder.addCase(sendOrder.fulfilled, (state, action:PayloadAction<TOrder>) => {
            state.order = action.payload
            state.loading = 'idle'
        });
        builder.addCase(sendOrder.rejected, (state) => {
            state.loading = 'idle'
        })
    },
})

export const orderAction = order.actions;