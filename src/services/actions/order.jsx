import { fetchOrder } from "../../utils/api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function sendOrder(ingredients, orderModalOpen) {
    return function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })

        fetchOrder(ingredients)
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
            .then(() => orderModalOpen())
            .catch(err => {
                console.log(err);
                dispatch({
                    type: SEND_ORDER_FAILED
                })
            })
    }
} 