import { ADD_INGREDIENT_TO_MODLAL, DELETE_INGREDIENT_FROM_MODLAL } from "../actions/modal";

const initialState = {
    ingredient: null
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_MODLAL: {
            return {
                ...state,
                ingredient: action.ingredient
            };
        }
        case DELETE_INGREDIENT_FROM_MODLAL: {
            return {
                ...state,
                ingredient: null
            };
        }
        default: {
            return state
        }
    }
} 