import api from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export function getIngridients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        fetch(`${api}/ingredients`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            })
            .then(data => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data.data
                })
            }).catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
} 