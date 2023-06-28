import { orderReducer, initialState } from './order';
import * as actions from '../../actions/order';
import { testOrder } from '../../../utils/test-data';

describe('orderReducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SEND_ORDER_REQUEST', () => {
        expect(orderReducer(undefined, {
            type: actions.SEND_ORDER_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                request: true
            }
        )
    })

    it('should handle SEND_ORDER_SUCCESS', () => {
        expect(orderReducer(undefined, {
            type: actions.SEND_ORDER_SUCCESS,
            order: testOrder,
        })
        ).toEqual(
            {
                ...initialState,
                order: testOrder
            }
        )
    })

    it('should handle SEND_ORDER_FAILED', () => {
        expect(
            orderReducer(undefined, {
                type: actions.SEND_ORDER_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                failed: true
            }
        )
    })

    it('should handle SEND_ORDER_RESET', () => {
        expect(
            orderReducer({
                ...initialState,
                order: testOrder
            }, {
                type: actions.SEND_ORDER_RESET,
            })
        ).toEqual(
            {
                ...initialState,
                order: null
            }
        )
    })
}) 