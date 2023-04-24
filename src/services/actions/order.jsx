import api from "../../utils/constants";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function sendOrder(ingredients, orderModalOpen) {
    return function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })
        fetch(`${api}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ingredients })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({
                        type: SEND_ORDER_FAILED
                    })
                }
            })
            .then(data => {
                dispatch({
                    type: SEND_ORDER_SUCCESS,
                    order: data.order
                })
            })
            .then(() => orderModalOpen())
            .catch(err => {
                dispatch({
                    type: SEND_ORDER_FAILED
                })
            })
    }
} 