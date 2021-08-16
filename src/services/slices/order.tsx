import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const api = 'https://norma.nomoreparties.space/api/orders';

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
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ingredients
        })
        return response.json()
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