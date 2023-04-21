import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN } from "../actions/constructor";

const initialState = {
    bun: null,
    main: [],
}

export const constructorReducer = (state = initialState, action) => {
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
                stuffing: [
                    ...state.main,
                    ...[action.main]
                ],
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
            };
        }
        default: {
            return state
        }
    }
} 