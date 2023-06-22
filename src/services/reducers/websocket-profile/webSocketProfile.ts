import type { TOrder } from '../../../utils/types';

import {
    WS_CONNECTION_PROFILE_SUCCESS,
    WS_CONNECTION_PROFILE_ERROR,
    WS_CONNECTION_PROFILE_CLOSED,
    WS_GET_PROFILE_MESSAGE,
    TWSProfileActions
} from '../../actions/webSocketProfile';

type TWSProfileState = {
    wsConnected: boolean;
    ordersProfile: TOrder[];

    error?: Event;
}

const initialState: TWSProfileState = {
    wsConnected: false,
    ordersProfile: []
};

export const wsReducerProfile = (state = initialState, action: TWSProfileActions): TWSProfileState => {
    switch (action.type) {
        case WS_CONNECTION_PROFILE_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_CONNECTION_PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_PROFILE_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                ordersProfile: []
            };
        case WS_GET_PROFILE_MESSAGE:
            return {
                ...state,
                error: undefined,
                wsConnected: true,
                ordersProfile: action.payload.orders
            };
        default:
            return state;
    }
}; 