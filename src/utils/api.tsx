import { getCookie, setCookie } from 'typescript-cookie';

const api = 'https://norma.nomoreparties.space/api';

export type TOptions = {
    method: string;
    headers: {
        "Content-Type": string;
        Authorization?: string;
    };
    body?: string;
};

export function request(endpoint: string, options?: TOptions): Promise<any> {
    return fetch((`${api}/${endpoint}`), options).then(checkResponse);
}

export const checkResponse = (res: Response): Promise<any> => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((error) => Promise.reject(error));
}

export const getNewToken = async () => {
    const token = getCookie('refreshToken');
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'token': token
        })
    }
    await request('auth/token', options)
        .then(res => {
            if (res.success) {
                const authToken = res.accessToken.split('Bearer ')[1];
                if (authToken) {
                    setCookie('token', authToken, {});
                }
                setCookie('refreshToken', res.refreshToken, {});
            } else {
                console.log("Произошла ошибка при обновлении токена")
            }
        })
        .catch(err => {
            console.log(err);
        })
}