import { combineReducers } from 'redux';
import { ingredients } from './ingredients'
import { current } from './current'
import { order } from './order'
import {constructors} from "./constructors";

export const rootReducer = combineReducers({
    ingredients: ingredients.reducer,
    constructors: constructors.reducer,
    current: current.reducer,
    order: order.reducer,
});

export type RootState = ReturnType <typeof rootReducer>