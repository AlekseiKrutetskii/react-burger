import { createAction } from '@reduxjs/toolkit';
// Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
export const GET_LIST_INGREDIENTS = 'GET_LIST_INGREDIENTS';
// Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
export const GET_LIST_INGREDIENTS_CONSTRUCTOR = 'GET_LIST_INGREDIENTS_CONSTRUCTOR';
// Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
export const ADD_CURRENT_VIEW_INGREDIENT = 'ADD_CURRENT_VIEW_INGREDIENT';
// Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
export const DEL_CURRENT_VIEW_INGREDIENT = 'DEL_CURRENT_VIEW_INGREDIENT';
// Получение и обновление номера заказа в модальном окне OrderDetails.
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';




export const connect = createAction<string, 'ORDERS_LIST_CONNECT'>('ORDERS_LIST_CONNECT');
export const disconnect = createAction('ORDERS_LIST_DISCONNECT');





