import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILED, TOrderActions, TOrder } from "../actions/order";

type TOrderState = {
    request: boolean,
    failed: boolean,
    order: null | TOrder,
}

const initialState: TOrderState = {
    request: false,
    failed: false,
    order: null
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                request: false,
                order: action.order
            };
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                failed: true,
                request: false
            };
        }
        default: {
            return state
        }
    }
} 