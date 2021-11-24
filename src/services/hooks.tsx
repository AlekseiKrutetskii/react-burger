import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import {RootState, AppDispatch} from "./reducers";

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, AnyAction } from 'redux';

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, AnyAction>>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();