import { TIngredient, TConstructorIngredient } from "../../utils/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const UPDATE_INGREDIENTS: 'UPDATE_INGREDIENTS' = 'UPDATE_INGREDIENTS';
export const RESET_INGREDIENTS: 'RESET_INGREDIENTS' = 'RESET_INGREDIENTS';

type TAddIngredient = {
    readonly type: typeof ADD_INGREDIENT;
    readonly item: TIngredient;
}
type TAddBun = {
    readonly type: typeof ADD_BUN;
    readonly bun: TIngredient;
}
type TUpdateIngredients = {
    readonly type: typeof UPDATE_INGREDIENTS;
    readonly ingredients: TConstructorIngredient[];
}
type TDeleteIngredient = {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: string;
}
type TResetIngredients = {
    readonly type: typeof RESET_INGREDIENTS;
}

export type TConstructorActions =
    | TAddIngredient
    | TAddBun
    | TUpdateIngredients
    | TDeleteIngredient
    | TResetIngredients;

export const addIngredient = (item: TIngredient): TAddIngredient => {
    item.id = crypto.randomUUID();
    return {
        type: ADD_INGREDIENT,
        item
    };
};

export const addBun = (bun: TIngredient): TAddBun => {
    return {
        type: ADD_BUN,
        bun
    };
};

export const updateIngredients = (ingredients: TConstructorIngredient[]): TUpdateIngredients => {
    return {
        type: UPDATE_INGREDIENTS,
        ingredients
    };
};

export const deleteIngredient = (id: string): TDeleteIngredient => {
    return {
        type: DELETE_INGREDIENT,
        id
    };
};

export const resetIngredients = (): TResetIngredients => {
    return {
        type: RESET_INGREDIENTS
    };
};