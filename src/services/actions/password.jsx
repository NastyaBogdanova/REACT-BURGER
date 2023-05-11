import { request } from "../../utils/api";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export function forgotPassword(email) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email
        })
    }
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })

        request('password-reset', options)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    })
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            })
    }
}

export function resetPassword(password, code) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "token": code
        })
    }
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })

        request('password-reset/reset', options)
            .then(res => {
                console.log(res);
                if (res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    })
                } else {
                    dispatch({
                        type: RESET_PASSWORD_FAILED
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            })
    }
}
