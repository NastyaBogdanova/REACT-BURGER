import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/ingredients';
import { constructorReducer } from './constructor/constructor';
import { orderReducer } from './order/order';
import { passwordReducer } from './password/password';
import { userReducer } from './user/user';
import { wsReducerFeed } from './websocket-feed/webSocketFeed';
import { wsReducerProfile } from './websocket-profile/webSocketProfile';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    order: orderReducer,
    password: passwordReducer,
    user: userReducer,
    ws: wsReducerFeed,
    wsProfile: wsReducerProfile,
});
