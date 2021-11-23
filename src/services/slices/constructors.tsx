import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TItem} from "../../types";

type TCount = {
    _id: string,
    qty: number
}

type TLoadItem = {
    item: TItem
}

type ConstructorState = {
    items: Array<TItem>,
    count: Array<TCount>
}

const initialState: ConstructorState = {
    items: [],
    count: []
}

export const constructors = createSlice({
    name: 'constructors',
    initialState,
    reducers: {
        add: (state, action:PayloadAction<TItem>) => {
            var customId = "id_"+Math.random();
            var idis = state.items.map(item => item._id)

            if (action.payload.type === "bun") {
                if (idis.includes(action.payload._id)) {
                    // Такая булка уже у нас в конструкторе, ничего не делаем
                } else {
                    // Новая булка, удаляем старую
                    state.items.filter(item => item.type === "bun").map(item => state.count = state.count.filter(citem => citem._id !== item._id))
                    state.count.push({_id: action.payload._id, qty: 2})
                    state.items = state.items.filter(item => item.type !== "bun")
                    state.items.unshift({...action.payload, customId})
                }
            } else {
                (state.count.filter(item => item._id === action.payload._id).length > 0)
                    ?
                    state.count = state.count.map(item =>
                        (item._id === action.payload._id) ? {...item, qty: ++item.qty} : item
                    )
                    : state.count.push({_id: action.payload._id, qty: 1})
                state.items.push({...action.payload, customId})
            }
        },
        del: (state, action:PayloadAction<TLoadItem>) => {
            state.count = state.count.map((item) => {
                if (item._id === action.payload.item._id) {
                    state.items = state.items.filter(item => item.customId !== action.payload.item.customId)
                    return {_id: action.payload.item._id, qty: item.qty - 1}
                } else {
                    return item
                }
            })
        },
        update: (state, action:PayloadAction<Array<TItem>>) => {
            state.items = action.payload
        },
        clear: (state) => {
            console.log('clear')
            state.items = []
            state.count = []
        }
    }
});

export const { add, del, update, clear } = constructors.actions;