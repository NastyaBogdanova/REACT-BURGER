import {
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED,
    LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
    EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILED,
    TUser, TUserActions
} from "../../actions/user";

type TUserState = {
    user: TUser,
    registerRequest: boolean,
    registerFailed: boolean,
    loggedIn: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
    logOutRequest: boolean,
    logOutFailed: boolean,
    getUserRequest: boolean,
    getUserFailed: boolean,
    getUserSuccess: boolean,
    editUserRequest: boolean,
    editUserFailed: boolean,
    editUserSuccess: boolean,
}

export const initialState: TUserState = {
    user: {
        "email": "",
        "name": "",
    },
    registerRequest: false,
    registerFailed: false,
    loggedIn: false,
    loginRequest: false,
    loginFailed: false,
    logOutRequest: false,
    logOutFailed: false,
    getUserRequest: false,
    getUserFailed: false,
    getUserSuccess: false,
    editUserRequest: false,
    editUserFailed: false,
    editUserSuccess: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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
                user: action.data,
                loggedIn: true
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
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
                user: action.data,
                loggedIn: true
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
                    "email": "",
                    "name": "",
                },
                loggedIn: false
            }
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state,
                logOutRequest: false,
                logOutFailed: true
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
                getUserSuccess: false
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.data,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: true,
                loggedIn: true,
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
                getUserSuccess: false
            }
        }
        case EDIT_USER_REQUEST: {
            return {
                ...state,
                editUserRequest: true,
                editUserFailed: false,
                editUserSuccess: false
            }
        }
        case EDIT_USER_SUCCESS: {
            return {
                ...state,
                user: action.data,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: true,
            }
        }
        case EDIT_USER_FAILED: {
            return {
                ...state,
                editUserRequest: false,
                editUserFailed: true,
                editUserSuccess: false
            }
        }
        default: {
            return state;
        }
    }
}