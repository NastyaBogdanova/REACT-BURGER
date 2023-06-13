import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { passwordReducer } from './password';
import { userReducer } from './user';
import { wsReducerFeed } from './webSocketFeed';
import { wsReducerProfile } from './webSocketProfile';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    order: orderReducer,
    password: passwordReducer,
    user: userReducer,
    ws: wsReducerFeed,
    wsProfile: wsReducerProfile,
});
