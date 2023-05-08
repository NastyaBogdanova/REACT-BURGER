import {
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
    LOGGED_IN, LOGGED_OUT,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED,
    LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED
} from "../actions/user";

const initialState = {
    user: {
        name: '',
        email: ''
    },
    registerRequest: false,
    registerFailed: false,
    loggedIn: false,
    loginRequest: false,
    loginFailed: false,
    logOutRequest: false,
    logOutFailed: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: false,
                user: action.data.user,
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            }
        }
        case LOGGED_IN: {
            return {
                ...state,
                loggedIn: true
            }
        }
        case LOGGED_OUT: {
            return {
                ...state,
                loggedIn: false
            }
        }
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                user: action.data.user,
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }
        case LOGOUT_USER_REQUEST: {
            return {
                ...state,
                logOutRequest: true,
                logOutFailed: false
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                logOutRequest: false,
                logOutFailed: false,
                user: {
                    name: '',
                    email: ''
                }
            }
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state,
                logOutRequest: false,
                logOutFailed: true
            }
        }
        default: {
            return state;
        }
    }
}