const api = 'https://norma.nomoreparties.space/api';

export function request(endpoint, options) {
    return fetch((`${api}/${endpoint}`), options).then(checkResponse);
}

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((error) => Promise.reject(error));
}