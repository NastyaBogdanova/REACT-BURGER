import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { passwordReducer } from './password';
import { userReducer } from './user';
import { wsReducer } from './webSocket';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    order: orderReducer,
    password: passwordReducer,
    user: userReducer,
    ws: wsReducer
});
