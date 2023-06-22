import { request, getNewToken } from "../../utils/api";
import { AppThunk } from "../types/index";
import { TConstructorIngredient } from "../../utils/types";
import { getCookie } from '../../utils/cookie';

export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';

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

export type TOrderActions =
    | TSendOrderRequest
    | TSendOrderSuccess
    | TSendOrderFaild;

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