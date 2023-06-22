import { userReducer } from './user';
import * as actions from '../../actions/user';
import { testUser, testUserEdited } from '../../../utils/test-data';

describe('userReducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
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
        )
    })

    it('should handle REGISTER_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: actions.REGISTER_USER_REQUEST,
        })
        ).toEqual(
            {
                user: {
                    "email": "",
                    "name": "",
                },
                registerRequest: true,
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
        )
    })

    it('should handle REGISTER_USER_SUCCESS', () => {
        expect(userReducer({
            user: {
                "email": "",
                "name": "",
            },
            registerRequest: true,
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
        }, {
            type: actions.REGISTER_USER_SUCCESS,
            data: testUser,
        })
        ).toEqual(
            {
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
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
        )
    })

    it('should handle REGISTER_USER_FAILED', () => {
        expect(
            userReducer({
                user: {
                    "email": "",
                    "name": "",
                },
                registerRequest: true,
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
            }, {
                type: actions.REGISTER_USER_FAILED,
            })
        ).toEqual(
            {
                user: {
                    "email": "",
                    "name": "",
                },
                registerRequest: false,
                registerFailed: true,
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
        )
    })

    it('should handle LOGIN_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: actions.LOGIN_USER_REQUEST,
        })
        ).toEqual(
            {
                user: {
                    "email": "",
                    "name": "",
                },
                registerRequest: false,
                registerFailed: false,
                loggedIn: false,
                loginRequest: true,
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
        )
    })

    it('should handle LOGIN_USER_SUCCESS', () => {
        expect(userReducer({
            user: {
                "email": "",
                "name": "",
            },
            registerRequest: false,
            registerFailed: false,
            loggedIn: false,
            loginRequest: true,
            loginFailed: false,
            logOutRequest: false,
            logOutFailed: false,
            getUserRequest: false,
            getUserFailed: false,
            getUserSuccess: false,
            editUserRequest: false,
            editUserFailed: false,
            editUserSuccess: false,
        }, {
            type: actions.LOGIN_USER_SUCCESS,
            data: testUser,
        })
        ).toEqual(
            {
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
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
        )
    })

    it('should handle LOGIN_USER_FAILED', () => {
        expect(
            userReducer({
                user: {
                    "email": "",
                    "name": "",
                },
                registerRequest: false,
                registerFailed: false,
                loggedIn: false,
                loginRequest: true,
                loginFailed: false,
                logOutRequest: false,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }, {
                type: actions.LOGIN_USER_FAILED,
            })
        ).toEqual(
            {
                user: {
                    "email": "",
                    "name": "",
                },
                registerRequest: false,
                registerFailed: false,
                loggedIn: false,
                loginRequest: false,
                loginFailed: true,
                logOutRequest: false,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }
        )
    })

    it('should handle LOGOUT_USER_REQUEST', () => {
        expect(userReducer({
            user: testUser,
            registerRequest: false,
            registerFailed: false,
            loggedIn: true,
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
        }, {
            type: actions.LOGOUT_USER_REQUEST,
        })
        ).toEqual(
            {
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: true,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }
        )
    })

    it('should handle LOGOUT_USER_SUCCESS', () => {
        expect(userReducer({
            user: testUser,
            registerRequest: false,
            registerFailed: false,
            loggedIn: true,
            loginRequest: false,
            loginFailed: false,
            logOutRequest: true,
            logOutFailed: false,
            getUserRequest: false,
            getUserFailed: false,
            getUserSuccess: false,
            editUserRequest: false,
            editUserFailed: false,
            editUserSuccess: false,
        }, {
            type: actions.LOGOUT_USER_SUCCESS,
        })
        ).toEqual(
            {
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
        )
    })

    it('should handle LOGOUT_USER_FAILED', () => {
        expect(
            userReducer({
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: true,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }, {
                type: actions.LOGOUT_USER_FAILED,
            })
        ).toEqual(
            {
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: false,
                logOutFailed: true,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }
        )
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: actions.GET_USER_REQUEST,
        })
        ).toEqual(
            {
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
                getUserRequest: true,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }
        )
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer({
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
            getUserRequest: true,
            getUserFailed: false,
            getUserSuccess: false,
            editUserRequest: false,
            editUserFailed: false,
            editUserSuccess: false,
        }, {
            type: actions.GET_USER_SUCCESS,
            data: testUser,
        })
        ).toEqual(
            {
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: false,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: true,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }
        )
    })

    it('should handle GET_USER_FAILED', () => {
        expect(
            userReducer({
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
                getUserRequest: true,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }, {
                type: actions.GET_USER_FAILED,
            })
        ).toEqual(
            {
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
                getUserFailed: true,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: false,
            }
        )
    })

    it('should handle EDIT_USER_REQUEST', () => {
        expect(userReducer({
            user: testUser,
            registerRequest: false,
            registerFailed: false,
            loggedIn: true,
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
        }, {
            type: actions.EDIT_USER_REQUEST,
        })
        ).toEqual(
            {
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: false,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: true,
                editUserFailed: false,
                editUserSuccess: false,
            }
        )
    })

    it('should handle EDIT_USER_SUCCESS', () => {
        expect(userReducer({
            user: testUser,
            registerRequest: false,
            registerFailed: false,
            loggedIn: true,
            loginRequest: false,
            loginFailed: false,
            logOutRequest: false,
            logOutFailed: false,
            getUserRequest: false,
            getUserFailed: false,
            getUserSuccess: false,
            editUserRequest: true,
            editUserFailed: false,
            editUserSuccess: false,
        }, {
            type: actions.EDIT_USER_SUCCESS,
            data: testUserEdited
        })
        ).toEqual(
            {
                user: testUserEdited,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: false,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: false,
                editUserSuccess: true,
            }
        )
    })

    it('should handle EDIT_USER_FAILED', () => {
        expect(
            userReducer({
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: false,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: true,
                editUserFailed: false,
                editUserSuccess: false,
            }, {
                type: actions.EDIT_USER_FAILED,
            })
        ).toEqual(
            {
                user: testUser,
                registerRequest: false,
                registerFailed: false,
                loggedIn: true,
                loginRequest: false,
                loginFailed: false,
                logOutRequest: false,
                logOutFailed: false,
                getUserRequest: false,
                getUserFailed: false,
                getUserSuccess: false,
                editUserRequest: false,
                editUserFailed: true,
                editUserSuccess: false,
            }
        )
    })

}) 