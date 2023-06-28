import { userReducer, initialState } from './user';
import * as actions from '../../actions/user';
import { testUser, testUserEdited } from '../../../utils/test-data';

describe('userReducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REGISTER_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: actions.REGISTER_USER_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                registerRequest: true,
            }
        )
    })

    it('should handle REGISTER_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            registerRequest: true,
        }, {
            type: actions.REGISTER_USER_SUCCESS,
            data: testUser,
        })
        ).toEqual(
            {
                ...initialState,
                user: testUser,
                registerRequest: false,
                loggedIn: true,
            }
        )
    })

    it('should handle REGISTER_USER_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                registerRequest: true,
            }, {
                type: actions.REGISTER_USER_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                registerRequest: false,
                registerFailed: true,
            }
        )
    })

    it('should handle LOGIN_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: actions.LOGIN_USER_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                loginRequest: true,
            }
        )
    })

    it('should handle LOGIN_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            loginRequest: true,
        }, {
            type: actions.LOGIN_USER_SUCCESS,
            data: testUser,
        })
        ).toEqual(
            {
                ...initialState,
                user: testUser,
                registerRequest: false,
                loggedIn: true,
            }
        )
    })

    it('should handle LOGIN_USER_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                loginRequest: true,
            }, {
                type: actions.LOGIN_USER_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                loginRequest: false,
                loginFailed: true,
            }
        )
    })

    it('should handle LOGOUT_USER_REQUEST', () => {
        expect(userReducer({
            ...initialState,
            user: testUser,
            loggedIn: true,
        }, {
            type: actions.LOGOUT_USER_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                user: testUser,
                loggedIn: true,
                logOutRequest: true,
            }
        )
    })

    it('should handle LOGOUT_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            user: testUser,
            loggedIn: true,
            logOutRequest: true,
        }, {
            type: actions.LOGOUT_USER_SUCCESS,
        })
        ).toEqual(
            {
                ...initialState,
                loggedIn: false,
                logOutRequest: false,
            }
        )
    })

    it('should handle LOGOUT_USER_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                user: testUser,
                loggedIn: true,
                logOutRequest: true,
            }, {
                type: actions.LOGOUT_USER_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                user: testUser,
                loggedIn: true,
                loginRequest: false,
                logOutFailed: true,
            }
        )
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: actions.GET_USER_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                getUserRequest: true,
            }
        )
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            getUserRequest: true,
        }, {
            type: actions.GET_USER_SUCCESS,
            data: testUser,
        })
        ).toEqual(
            {
                ...initialState,
                user: testUser,
                loggedIn: true,
                getUserRequest: false,
                getUserSuccess: true,
            }
        )
    })

    it('should handle GET_USER_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                getUserRequest: true,
            }, {
                type: actions.GET_USER_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                getUserRequest: false,
                getUserFailed: true,
            }
        )
    })

    it('should handle EDIT_USER_REQUEST', () => {
        expect(userReducer({
            ...initialState,
            user: testUser,
            loggedIn: true,
        }, {
            type: actions.EDIT_USER_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                user: testUser,
                editUserRequest: true,
                loggedIn: true,
            }
        )
    })

    it('should handle EDIT_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            user: testUser,
            loggedIn: true,
            editUserRequest: true,
        }, {
            type: actions.EDIT_USER_SUCCESS,
            data: testUserEdited
        })
        ).toEqual(
            {
                ...initialState,
                user: testUserEdited,
                loggedIn: true,
                editUserRequest: false,
                editUserSuccess: true,
            }
        )
    })

    it('should handle EDIT_USER_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                user: testUser,
                loggedIn: true,
                editUserRequest: true,
            }, {
                type: actions.EDIT_USER_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                user: testUser,
                loggedIn: true,
                editUserRequest: false,
                editUserFailed: true,
            }
        )
    })
}) 