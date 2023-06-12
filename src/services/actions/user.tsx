import { request } from "../../utils/api";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { AppThunk } from "../types/index";

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const EDIT_USER_REQUEST: 'EDIT_USER_REQUEST' = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS' = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED: 'EDIT_USER_FAILED' = 'EDIT_USER_FAILED';

export type TUser = {
    "email": string,
    "name": string,
}

type TRegisterUserRequest = {
    readonly type: typeof REGISTER_USER_REQUEST;
}
type TRegisterUserSuccess = {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly data: TUser;
}
type TRegisterUserFaild = {
    readonly type: typeof REGISTER_USER_FAILED;
}

type TLoginUserRequest = {
    readonly type: typeof LOGIN_USER_REQUEST;
}
type TLoginUserSuccess = {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly data: TUser;
}
type TLoginUserFaild = {
    readonly type: typeof LOGIN_USER_FAILED;
}

type TLogoutUserRequest = {
    readonly type: typeof LOGOUT_USER_REQUEST;
}
type TLogoutUserSuccess = {
    readonly type: typeof LOGOUT_USER_SUCCESS;
}
type TLogoutUserFaild = {
    readonly type: typeof LOGOUT_USER_FAILED;
}

type TGetUserRequest = {
    readonly type: typeof GET_USER_REQUEST;
}
type TGetUserSuccess = {
    readonly type: typeof GET_USER_SUCCESS;
    readonly data: TUser;
}
type TGetUserFaild = {
    readonly type: typeof GET_USER_FAILED;
}

type TEditUserRequest = {
    readonly type: typeof EDIT_USER_REQUEST;
}
type TEditUserSuccess = {
    readonly type: typeof EDIT_USER_SUCCESS;
    readonly data: TUser;
}
type TEditUserFaild = {
    readonly type: typeof EDIT_USER_FAILED;
}

export type TUserActions =
    | TRegisterUserRequest | TRegisterUserSuccess | TRegisterUserFaild
    | TLoginUserRequest | TLoginUserSuccess | TLoginUserFaild
    | TLogoutUserRequest | TLogoutUserSuccess | TLogoutUserFaild
    | TGetUserRequest | TGetUserSuccess | TGetUserFaild
    | TEditUserRequest | TEditUserSuccess | TEditUserFaild;

const registerUserRequest = (): TRegisterUserRequest => {
    return {
        type: REGISTER_USER_REQUEST
    };
};
const registerUserSuccess = (data: TUser): TRegisterUserSuccess => {
    return {
        type: REGISTER_USER_SUCCESS,
        data
    };
};
const registerUserFaild = (): TRegisterUserFaild => {
    return {
        type: REGISTER_USER_FAILED
    };
};

const loginUserRequest = (): TLoginUserRequest => {
    return {
        type: LOGIN_USER_REQUEST
    };
};
const loginUserSuccess = (data: TUser): TLoginUserSuccess => {
    return {
        type: LOGIN_USER_SUCCESS,
        data
    };
};
const loginUserFaild = (): TLoginUserFaild => {
    return {
        type: LOGIN_USER_FAILED
    };
};

const logoutUserRequest = (): TLogoutUserRequest => {
    return {
        type: LOGOUT_USER_REQUEST
    };
};
const logoutUserSuccess = (): TLogoutUserSuccess => {
    return {
        type: LOGOUT_USER_SUCCESS
    };
};
const logoutUserFaild = (): TLogoutUserFaild => {
    return {
        type: LOGOUT_USER_FAILED
    };
};

const getUserRequest = (): TGetUserRequest => {
    return {
        type: GET_USER_REQUEST
    };
};
const getUserSuccess = (data: TUser): TGetUserSuccess => {
    return {
        type: GET_USER_SUCCESS,
        data
    };
};
const getUserFaild = (): TGetUserFaild => {
    return {
        type: GET_USER_FAILED
    };
};

const editUserRequest = (): TEditUserRequest => {
    return {
        type: EDIT_USER_REQUEST
    };
};
const editUserSuccess = (data: TUser): TEditUserSuccess => {
    return {
        type: EDIT_USER_SUCCESS,
        data
    };
};
const editUserFaild = (): TEditUserFaild => {
    return {
        type: EDIT_USER_FAILED
    };
};

const checkUserRequest = (method: string, body?: string) => {
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

export const editUser: AppThunk = (email: string, name: string, password: string) => {
    const body = JSON.stringify({
        'email': email,
        'name': name,
        'password': password
    });
    return function (dispatch) {
        dispatch(editUserRequest());
        checkUserRequest('PATCH', body)
            .then(res => {
                if (res.success) {
                    dispatch(editUserSuccess(res.user));
                } else {
                    console.log("Произошла ошибка при сохранении данных.");
                    dispatch(editUserFaild());
                }
            })
            .catch(err => {
                if (err.message == "invalid token" || err.message == "jwt expired") {
                    getNewToken()
                        .then(() => {
                            checkUserRequest('PATCH', body)
                                .then(res => {
                                    if (res.success) {
                                        dispatch(editUserSuccess(res.user));
                                    } else {
                                        console.log("Произошла ошибка при сохранении данных.");
                                        dispatch(editUserFaild());
                                    }
                                })
                                .catch(err => {
                                    console.log(err.message);
                                    dispatch(editUserFaild());
                                })
                        })
                } else {
                    console.log(err.message);
                    dispatch(editUserFaild());
                }
            })
    }
}

export const getUser: AppThunk = () => {
    const token = getCookie('token');
    const refreshToken = getCookie('refreshToken');

    if (!token && !refreshToken) {
        return async () => { console.log("Пользователь не авторизован.") };
    }

    return function (dispatch) {
        dispatch(getUserRequest());
        checkUserRequest('GET')
            .then(res => {
                if (res.success) {
                    dispatch(getUserSuccess(res.user));
                } else {
                    console.log("Произошла ошибка при получении данных пользователя.");
                    dispatch(getUserFaild());
                }
            })
            .catch(err => {
                if (err.message == "invalid token" || err.message == "jwt expired") {
                    getNewToken()
                        .then(() => {
                            checkUserRequest('GET')
                                .then(res => {
                                    if (res.success) {
                                        dispatch(getUserSuccess(res.user));
                                    } else {
                                        console.log("Произошла ошибка при получении данных пользователя.");
                                        dispatch(getUserFaild());
                                    }
                                })
                                .catch(err => {
                                    console.log(err.message);
                                    dispatch(getUserFaild());
                                })
                        })
                } else {
                    console.log(err.message);
                    dispatch(getUserFaild());
                }
            })
    }
}

export const loginUser: AppThunk = (email: string, password: string) => {
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
        dispatch(loginUserRequest());
        request('auth/login', options)
            .then(res => {
                if (res.success) {
                    dispatch(loginUserSuccess(res.user));
                    const authToken = res.accessToken.split('Bearer ')[1];
                    if (authToken) {
                        setCookie('token', authToken, {});
                    }
                    setCookie('refreshToken', res.refreshToken, {});
                } else {
                    dispatch(loginUserFaild());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(loginUserFaild());
            })
    }
}

export const logOutUser: AppThunk = () => {
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
        dispatch(logoutUserRequest());
        request('auth/logout', options)
            .then(res => {
                if (res.success) {
                    dispatch(logoutUserSuccess());
                    removeCookie('token');
                    removeCookie('refreshToken');
                } else {
                    dispatch(logoutUserFaild());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(logoutUserFaild());
            })
    }
}

export const registerUser: AppThunk = (name: string, email: string, password: string) => {
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
        dispatch(registerUserRequest());
        request('auth/register', options)
            .then(res => {
                if (res.success) {
                    dispatch(registerUserSuccess(res.user));
                    const authToken = res.accessToken.split('Bearer ')[1];
                    if (authToken) {
                        setCookie('token', authToken, {});
                    }
                    setCookie('refreshToken', res.refreshToken, {});
                } else {
                    dispatch(registerUserFaild());
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(registerUserFaild());
            })
    }
}