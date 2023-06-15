import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN, UPDATE_INGREDIENTS, RESET_INGREDIENTS, TConstructorActions } from "../actions/constructor";
import { TIngredient, TConstructorIngredient } from "../../utils/types";

type TConstructorState = {
    stuffings: Array<TConstructorIngredient>,
    bun: null | TIngredient,
}

const initialState: TConstructorState = {
    stuffings: [],
    bun: null,
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: { ...action.bun },
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                stuffings: [
                    ...(state.stuffings || []),
                    //...state.stuffings, это должно работать, но почему-то не работает
                    { ...action.item }
                ]
            }
        }
        case UPDATE_INGREDIENTS:
            return {
                ...state,
                stuffings: action.ingredients
            }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                stuffings: [...state.stuffings.filter(item => item.id !== action.id)]
            };
        }
        case RESET_INGREDIENTS: {
            return {
                ...state,
                stuffings: [],
                bun: null
            };
        }
        default: {
            return state
        }
    }
} 