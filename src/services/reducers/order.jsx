import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILED } from "../actions/order";

const initialState = {
    request: false,
    failed: false,
    order: null
}

export const orderReducer = (state = initialState, action) => {
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