export const bun = {
    _id: '1111',
    name: "Булка",
    type: "bun",
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 500,
    price: 100,
    image: "bun-image.jpg",
    image_mobile: "bun-image-mobile.jpg",
    image_large: "bun-image-large.jpg",
    __v: 0,
    id: '1'
}

export const mainIngredient = {
    _id: '2222',
    name: "Котлетка",
    type: "main",
    proteins: 20,
    fat: 20,
    carbohydrates: 20,
    calories: 600,
    price: 300,
    image: "main-image.jpg",
    image_mobile: "main-image-mobile.jpg",
    image_large: "main-image-large.jpg",
    __v: 0,
    id: '2'
}

export const sauceIngredient = {
    _id: '3333',
    name: "Соус сырный",
    type: "sauce",
    proteins: 30,
    fat: 30,
    carbohydrates: 30,
    calories: 300,
    price: 200,
    image: "sauce-image.jpg",
    image_mobile: "sauce-image-mobile.jpg",
    image_large: "sauce-image-large.jpg",
    __v: 0,
    id: '3'
}

export const firstIngredient = {
    _id: '444',
    name: "Соус горчичный",
    type: "sauce",
    proteins: 30,
    fat: 30,
    carbohydrates: 30,
    calories: 300,
    price: 200,
    image: "sauce-image.jpg",
    image_mobile: "sauce-image-mobile.jpg",
    image_large: "sauce-image-large.jpg",
    __v: 0,
}

export const secondIngredient = {
    _id: '555',
    name: "Котленка куриная",
    type: "main",
    proteins: 30,
    fat: 30,
    carbohydrates: 30,
    calories: 500,
    price: 200,
    image: "main-image.jpg",
    image_mobile: "main-image-mobile.jpg",
    image_large: "main-image-large.jpg",
    __v: 0,
}

export const testOrder = {
    "name": "Бургер Бургерович",
    "order": {
        "number": 1234,
    },
    "success": true
}

export const testUser = {
    "email": "test@test.test",
    "name": "Юзер Юзерович",
}

export const testUserEdited = {
    "email": "test111@test.test",
    "name": "Юзер Юзерович",
}

export const testFeed = {
    ingredients: [1111, 2222, 3333],
    _id: 123,
    status: 'done',
    number: 4,
    createdAt: 12 / 12 / 2012,
    updatedAt: 13 / 12 / 2012,
    name: "Очень вкусный бургер"
}

export const testMessage = {
    total: 200,
    totalToday: 100,
    orders: [testFeed]
}