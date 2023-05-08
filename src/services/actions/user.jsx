import { request } from "../../utils/api";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_REQUEST';

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
                    dispatch({
                        type: LOGGED_IN
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
                    dispatch({
                        type: LOGGED_OUT
                    })
                    deleteCookie('token');
                    deleteCookie('refreshToken');
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
                    dispatch({
                        type: LOGGED_IN
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

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
}

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}