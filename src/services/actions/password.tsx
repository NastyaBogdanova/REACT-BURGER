import { request } from "../../utils/api";
import { AppThunk } from "../types/index";

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

type TForgotPasswordRequest = {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
type TForgotPasswordSuccess = {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
type TForgotPasswordFaild = {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

type TResetPasswordRequest = {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
type TResetPasswordSuccess = {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
type TResetPasswordFaild = {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TPasswordActions =
    | TForgotPasswordRequest
    | TForgotPasswordSuccess
    | TForgotPasswordFaild
    | TResetPasswordRequest
    | TResetPasswordSuccess
    | TResetPasswordFaild;

const forgotPasswordRequest = (): TForgotPasswordRequest => {
    return {
        type: FORGOT_PASSWORD_REQUEST
    };
};

const forgotPasswordSuccess = (): TForgotPasswordSuccess => {
    return {
        type: FORGOT_PASSWORD_SUCCESS
    };
};

const forgotPasswordFaild = (): TForgotPasswordFaild => {
    return {
        type: FORGOT_PASSWORD_FAILED
    };
};

const resetPasswordRequest = (): TResetPasswordRequest => {
    return {
        type: RESET_PASSWORD_REQUEST
    };
};

const resetPasswordSuccess = (): TResetPasswordSuccess => {
    return {
        type: RESET_PASSWORD_SUCCESS
    };
};

const resetPasswordFaild = (): TResetPasswordFaild => {
    return {
        type: RESET_PASSWORD_FAILED
    };
};

export const forgotPassword: AppThunk = (email: string) => {
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
        dispatch(forgotPasswordRequest());
        request('password-reset', options)
            .then(res => {
                if (res.success) {
                    dispatch(forgotPasswordSuccess())
                } else {
                    dispatch(forgotPasswordFaild())
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(forgotPasswordFaild())
            })
    }
}

export const resetPassword: AppThunk = (password: string, code: string) => {
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
        dispatch(resetPasswordRequest());
        request('password-reset/reset', options)
            .then(res => {
                if (res.success) {
                    dispatch(resetPasswordSuccess())
                } else {
                    dispatch(resetPasswordFaild())
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(resetPasswordFaild())
            })
    }
}
