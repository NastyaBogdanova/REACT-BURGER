import { passwordReducer, initialState } from './password';
import * as actions from '../../actions/password';

describe('passwordReducer', () => {
    it('should return the initial state', () => {
        expect(passwordReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(passwordReducer(undefined, {
            type: actions.FORGOT_PASSWORD_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                forgotPasswordRequest: true,
            }
        )
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(passwordReducer(undefined, {
            type: actions.FORGOT_PASSWORD_SUCCESS
        })
        ).toEqual(
            {
                ...initialState,
                forgotPasswordSuccess: true,
            }
        )
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(
            passwordReducer(undefined, {
                type: actions.FORGOT_PASSWORD_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                forgotPasswordFailed: true,
            }
        )
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(passwordReducer(undefined, {
            type: actions.RESET_PASSWORD_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                resetPasswordRequest: true,
            }
        )
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(passwordReducer(undefined, {
            type: actions.RESET_PASSWORD_SUCCESS
        })
        ).toEqual(
            {
                ...initialState,
                resetPasswordSuccess: true
            }
        )
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(
            passwordReducer(undefined, {
                type: actions.RESET_PASSWORD_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                resetPasswordFailed: true,
            }
        )
    })
}) 