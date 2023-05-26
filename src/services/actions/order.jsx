import { request } from "../../utils/api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function sendOrder(ingredients) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
    }
    return function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })

        request('orders', options)
            .then(res => {
                if (res) {
                    dispatch({
                        type: SEND_ORDER_SUCCESS,
                        order: res.order
                    })
                } else {
                    dispatch({
                        type: SEND_ORDER_FAILED
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: SEND_ORDER_FAILED
                })
            })
    }
} 