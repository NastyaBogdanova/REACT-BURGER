import { rootReducer } from '../services/reducers/root';

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    id: string;
};

export type TConstructorIngredient = TIngredient & {
    id: string;
};

export type RootState = ReturnType<typeof rootReducer>;