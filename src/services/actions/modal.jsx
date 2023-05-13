export const ADD_INGREDIENT_TO_MODLAL = 'ADD_INGREDIENT_TO_MODLAL';
export const DELETE_INGREDIENT_FROM_MODLAL = 'DELETE_INGREDIENT_FROM_MODLAL';

export const addIngredientToModal = (item) => {
    return {
        type: ADD_INGREDIENT_TO_MODLAL,
        ingredient: item
    };
};

export const deleteIngredientFromModlal = () => {
    return {
        type: DELETE_INGREDIENT_FROM_MODLAL,
        ingredient: null
    };
};