import { combineReducers } from 'redux';
import { ingredients } from '../slices/ingredients'
import { current } from '../slices/current'
import { order } from '../slices/order'
import {constructors} from "../slices/constructors";
import {user} from "../slices/user"
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
    ingredients: ingredients.reducer,
    constructors: constructors.reducer,
    current: current.reducer,
    order: order.reducer,
    user: user.reducer,
    router: connectRouter(history)
});

export type RootState = ReturnType <typeof rootReducer>