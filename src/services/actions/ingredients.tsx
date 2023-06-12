import { request } from "../../utils/api";
import { AppThunk } from "../types/index";
import { TIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

type TGetIngridientsRequest = {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
type TGetIngridientsSuccess = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}
type TGetIngridientsFaild = {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
    | TGetIngridientsRequest
    | TGetIngridientsSuccess
    | TGetIngridientsFaild;

const getIngridientsRequest = (): TGetIngridientsRequest => {
    return {
        type: GET_INGREDIENTS_REQUEST
    };
};

const getIngridientsSuccess = (ingredients: TIngredient[]): TGetIngridientsSuccess => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients
    };
};

const getIngridientsFaild = (): TGetIngridientsFaild => {
    return {
        type: GET_INGREDIENTS_FAILED
    };
};

export const getIngridients: AppThunk = () => {
    return function (dispatch) {
        dispatch(getIngridientsRequest());
        request('ingredients')
            .then(res => {
                if (res) {
                    dispatch(getIngridientsSuccess(res.data))
                } else {
                    dispatch(getIngridientsFaild())
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(getIngridientsFaild());
            });
    }
} 