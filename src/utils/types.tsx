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

export type TOrder = {
    ingredients: string[],
    _id: string,
    status: 'done' | 'pending' | 'created' | 'canceled',
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string
}

export type TOrders = {
    orders: TOrder[],
}

export type TMessage = {
    success: boolean,
    orders: TOrder[],
    total: number,
    totalToday: number
}
