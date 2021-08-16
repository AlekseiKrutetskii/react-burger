import { combineReducers } from 'redux';
import { ingredients } from '../slices/ingredients'
import { current } from '../slices/current'
import { order } from '../slices/order'
import {constructors} from "../slices/constructors";

export const rootReducer = combineReducers({
    ingredients: ingredients.reducer,
    constructors: constructors.reducer,
    current: current.reducer,
    order: order.reducer,
});

export type RootState = ReturnType <typeof rootReducer>