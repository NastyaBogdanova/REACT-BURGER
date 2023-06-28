import { wsReducerFeed, initialState } from './webSocketFeed';
import * as actions from '../../actions/webSocketFeed';
import { testFeed, testMessage } from '../../../utils/test-data';

describe('wsReducerFeed', () => {
    it('should return the initial state', () => {
        expect(wsReducerFeed(undefined, {})).toEqual(initialState)
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducerFeed(undefined, {
            type: actions.WS_CONNECTION_SUCCESS,
        })
        ).toEqual(
            {
                ...initialState,
                wsConnected: true,
            }
        )
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducerFeed({
            wsConnected: true,
            total: 100,
            totalToday: 10,
            orders: [testFeed]
        }, {
            type: actions.WS_CONNECTION_CLOSED
        })
        ).toEqual(initialState)
    })

    it('should handle WS_GET_MESSAGE', () => {
        expect(
            wsReducerFeed(undefined, {
                type: actions.WS_GET_MESSAGE,
                payload: testMessage
            })
        ).toEqual(
            {
                wsConnected: true,
                total: testMessage.total,
                totalToday: testMessage.totalToday,
                orders: testMessage.orders
            }
        )
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducerFeed(undefined, {
                type: actions.WS_CONNECTION_ERROR,
                payload: "Ошибка 404"
            })
        ).toEqual(
            {
                ...initialState,
                error: "Ошибка 404"
            }
        )
    })

}) 