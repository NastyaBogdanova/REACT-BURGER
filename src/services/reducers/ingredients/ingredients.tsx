import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, TIngredientsActions } from "../../actions/ingredients";
import { TIngredient } from "../../../utils/types";

type TIngredientsState = {
    request: boolean,
    failed: boolean,
    ingredients: ReadonlyArray<TIngredient>,
}

export const initialState: TIngredientsState = {
    request: false,
    failed: false,
    ingredients: []
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                request: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
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