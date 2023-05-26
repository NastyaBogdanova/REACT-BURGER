import { request } from "../../utils/api";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

function checkUserRequest(method, body) {
    let authToken = getCookie('token');
    let options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + authToken
        },
        body: body

    }
    return request('auth/user', options)
}

const getNewToken = async () => {
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

export function editUser(email, name, password) {
    const body = JSON.stringify({
        'email': email,
        'name': name,
        'password': password
    });
    return function (dispatch) {
        dispatch({
            type: EDIT_USER_REQUEST
        })
        checkUserRequest('PATCH', body)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: EDIT_USER_SUCCESS,
                        data: res.user
                    })
                } else {
                    console.log("Произошла ошибка при сохранении данных.")
                    dispatch({
                        type: EDIT_USER_FAILED
                    })
                }
            })
            .catch(err => {
                if (err.message == "invalid token" || err.message == "jwt expired") {
                    getNewToken()
                        .then(() => {
                            checkUserRequest('PATCH', body)
                                .then(res => {
                                    if (res.success) {
                                        dispatch({
                                            type: EDIT_USER_SUCCESS,
                                            data: res.user
                                        })
                                    } else {
                                        console.log("Произошла ошибка при сохранении данных.")
                                        dispatch({
                                            type: EDIT_USER_FAILED
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log(err.message);
                                    dispatch({
                                        type: EDIT_USER_FAILED
                                    })
                                })
                        })
                } else {
                    console.log(err.message);
                    dispatch({
                        type: EDIT_USER_FAILED
                    })
                }
            })
    }
}

export function getUser() {
    const token = getCookie('token');
    const refreshToken = getCookie('refreshToken');

    if (!token && !refreshToken) {
        return async () => { console.log("Пользователь не авторизован.") };
    }

    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        checkUserRequest('GET')
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        data: res.user
                    })
                } else {
                    console.log("Произошла ошибка при получении данных пользователя.")
                    dispatch({
                        type: GET_USER_FAILED
                    })
                }
            })
            .catch(err => {
                if (err.message == "invalid token" || err.message == "jwt expired") {
                    getNewToken()
                        .then(() => {
                            checkUserRequest('GET')
                                .then(res => {
                                    if (res.success) {
                                        dispatch({
                                            type: GET_USER_SUCCESS,
                                            data: res.user
                                        })
                                    } else {
                                        console.log("Произошла ошибка при получении данных пользователя.")
                                        dispatch({
                                            type: GET_USER_FAILED
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log(err.message);
                                    dispatch({
                                        type: GET_USER_FAILED
                                    })
                                })
                        })
                } else {
                    console.log(err.message);
                    dispatch({
                        type: GET_USER_FAILED
                    })
                }
            })
    }
}

export function loginUser(email, password) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    }
    return function (dispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST
        })

        request('auth/login', options)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        data: res
                    })
                    const authToken = res.accessToken.split('Bearer ')[1];
                    if (authToken) {
                        setCookie('token', authToken, {});
                    }
                    setCookie('refreshToken', res.refreshToken, {});
                } else {
                    dispatch({
                        type: LOGIN_USER_FAILED
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: LOGIN_USER_FAILED
                })
            })
    }
}

export function logOutUser() {
    const refreshToken = getCookie('refreshToken')
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "token": refreshToken
        })
    }
    return function (dispatch) {
        dispatch({
            type: LOGOUT_USER_REQUEST
        })

        request('auth/logout', options)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: LOGOUT_USER_SUCCESS
                    })
                    removeCookie('token');
                    removeCookie('refreshToken');
                } else {
                    dispatch({
                        type: LOGOUT_USER_FAILED
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: LOGOUT_USER_FAILED
                })
            })
    }
}

export function registerUser(name, email, password) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email,
            'name': name,
            'password': password
        })
    }
    return function (dispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST
        })

        request('auth/register', options)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        data: res
                    })
                    const authToken = res.accessToken.split('Bearer ')[1];
                    if (authToken) {
                        setCookie('token', authToken, {});
                    }
                    setCookie('refreshToken', res.refreshToken, {});
                } else {
                    dispatch({
                        type: REGISTER_USER_FAILED
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: REGISTER_USER_FAILED
                })
            })
    }
}