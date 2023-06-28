import { request, getNewToken } from "../../utils/api";
import { AppThunk } from "../types/index";
import { TConstructorIngredient } from "../../utils/types";
import { getCookie } from '../../utils/cookie';

export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';
export const SEND_ORDER_RESET: 'SEND_ORDER_RESET' = 'SEND_ORDER_RESET';

export type TOrder = {
    "name": string,
    "order": {
        "number": number,
    },
    "success": true
}

type TSendOrderRequest = {
    readonly type: typeof SEND_ORDER_REQUEST;
}
type TSendOrderSuccess = {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly order: TOrder;
}
type TSendOrderFaild = {
    readonly type: typeof SEND_ORDER_FAILED;
}
type TSendOrderReset = {
    readonly type: typeof SEND_ORDER_RESET;
}

export type TOrderActions =
    | TSendOrderRequest
    | TSendOrderSuccess
    | TSendOrderFaild
    | TSendOrderReset;

const sendOrderRequest = (): TSendOrderRequest => {
    return {
        type: SEND_ORDER_REQUEST
    };
};

const sendOrderSuccess = (order: TOrder): TSendOrderSuccess => {
    return {
        type: SEND_ORDER_SUCCESS,
        order
    };
};

const sendOrderFaild = (): TSendOrderFaild => {
    return {
        type: SEND_ORDER_FAILED
    };
};
const sendOrderReset = (): TSendOrderReset => {
    return {
        type: SEND_ORDER_RESET
    };
};

export const sendOrder: AppThunk = (ingredients: TConstructorIngredient[]) => {
    let authToken = getCookie('token');
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + authToken
        },
        body: JSON.stringify({ ingredients })
    }
    return function (dispatch) {
        dispatch(sendOrderReset())
        dispatch(sendOrderRequest())
        request('orders', options)
            .then(res => {
                if (res) {
                    dispatch(sendOrderSuccess(res))
                } else {
                    dispatch(sendOrderFaild())
                }
            })
            .catch(err => {
                if (err.message == "invalid token" || err.message == "jwt expired") {
                    getNewToken()
                        .then(() => {
                            authToken = getCookie('token');
                            options.headers.Authorization = 'Bearer ' + authToken;
                            request('orders', options)
                                .then(res => {
                                    if (res.success) {
                                        dispatch(sendOrderSuccess(res))
                                    } else {
                                        console.log("Произошла ошибка при создании заказа.");
                                        dispatch(sendOrderFaild())
                                    }
                                })
                                .catch(err => {
                                    console.log(err.message);
                                    dispatch(sendOrderFaild());
                                })
                        })
                } else {
                    console.log(err.message);
                    dispatch(sendOrderFaild());
                }
            })
    }
} 