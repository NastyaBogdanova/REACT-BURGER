import {
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
    TPasswordActions
} from "../../actions/password";

type TPasswordState = {
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,
    forgotPasswordSuccess: boolean,
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
    resetPasswordSuccess: boolean
}

const initialState: TPasswordState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false
}

export const passwordReducer = (state = initialState, action: TPasswordActions): TPasswordState => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordFailed: false,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordFailed: true,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: false
            }
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
                resetPasswordSuccess: false
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordFailed: false,
                resetPasswordRequest: false,
                resetPasswordSuccess: true
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordRequest: false,
                resetPasswordSuccess: false
            }
        }
        default: {
            return state;
        }
    }
}