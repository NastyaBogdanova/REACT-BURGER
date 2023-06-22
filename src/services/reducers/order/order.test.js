import { orderReducer } from './order';
import * as actions from '../../actions/order';
import { testOrder } from '../../../utils/test-data';

describe('orderReducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(
            {
                request: false,
                failed: false,
                order: null
            }
        )
    })

    it('should handle SEND_ORDER_REQUEST', () => {
        expect(orderReducer(undefined, {
            type: actions.SEND_ORDER_REQUEST,
        })
        ).toEqual(
            {
                request: true,
                failed: false,
                order: null
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
                request: false,
                failed: false,
                order: testOrder,
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
                failed: true,
                request: false,
                order: null
            }
        )
    })
}) 