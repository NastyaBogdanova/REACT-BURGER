import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { passwordReducer } from './password';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    modal: modalReducer,
    order: orderReducer,
    password: passwordReducer,
    user: userReducer
});