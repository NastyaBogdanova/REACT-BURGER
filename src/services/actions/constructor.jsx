export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

export const addIngredient = (item) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...item, id: crypto.randomUUID()
        }

    };
};
export const addBun = (bun) => {
    return {
        type: ADD_BUN,
        bun
    };
};
export const updateIngredients = (ingredients) => {
    return {
        type: UPDATE_INGREDIENTS,
        ingredients
    };
};
export const deleteIngredient = (id) => {
    return {
        type: DELETE_INGREDIENT,
        id
    };
};
export const resetIngredients = () => {
    return {
        type: RESET_INGREDIENTS
    };
};