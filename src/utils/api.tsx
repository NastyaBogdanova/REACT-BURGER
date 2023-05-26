const api = 'https://norma.nomoreparties.space/api';

export type TOptions = {
    method: string;
    headers: {
        "Content-Type": string;
        Authorization?: string;
    };
    body: string;
};

export function request(endpoint: string, options: TOptions): Promise<any> {
    return fetch((`${api}/${endpoint}`), options).then(checkResponse);
}

export const checkResponse = (res: Response): Promise<any> => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((error) => Promise.reject(error));
}