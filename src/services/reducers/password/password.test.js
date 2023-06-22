import { passwordReducer } from './password';
import * as actions from '../../actions/password';

describe('passwordReducer', () => {
    it('should return the initial state', () => {
        expect(passwordReducer(undefined, {})).toEqual(
            {
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: false,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                resetPasswordSuccess: false
            }
        )
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(passwordReducer(undefined, {
            type: actions.FORGOT_PASSWORD_REQUEST,
        })
        ).toEqual(
            {
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: false,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                resetPasswordSuccess: false
            }
        )
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(passwordReducer(undefined, {
            type: actions.FORGOT_PASSWORD_SUCCESS
        })
        ).toEqual(
            {
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: true,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                resetPasswordSuccess: false
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
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
                forgotPasswordSuccess: false,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                resetPasswordSuccess: false
            }
        )
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(passwordReducer(undefined, {
            type: actions.RESET_PASSWORD_REQUEST,
        })
        ).toEqual(
            {
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: false,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
                resetPasswordSuccess: false
            }
        )
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(passwordReducer(undefined, {
            type: actions.RESET_PASSWORD_SUCCESS
        })
        ).toEqual(
            {
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: false,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
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
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: false,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
                resetPasswordSuccess: false
            }
        )
    })
}) 