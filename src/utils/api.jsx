const api = 'https://norma.nomoreparties.space/api';

export function fetchIngredients() {
    return fetch(`${api}/ingredients`)
        .then(checkResponse)
        .then(res => res.data)
}

export function fetchOrder(ingredients) {
    return fetch(`${api}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
    })
        .then(checkResponse)
}

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}