import { fetchIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export function getIngridients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })

        fetchIngredients()
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            });
    }
} 