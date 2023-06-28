import type { TOrder } from '../../../utils/types';

import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TWSActions
} from '../../actions/webSocketFeed';

type TWSState = {
    wsConnected: boolean;
    total: number,
    totalToday: number,
    orders: TOrder[];

    error?: Event;
}

export const initialState: TWSState = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    orders: []
};

export const wsReducerFeed = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                total: 0,
                totalToday: 0,
                orders: []
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                wsConnected: true,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                orders: action.payload.orders
            };
        default:
            return state;
    }
}; 