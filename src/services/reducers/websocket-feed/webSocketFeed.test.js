import { wsReducerFeed } from './webSocketFeed';
import * as actions from '../../actions/webSocketFeed';
import { testFeed, testMessage } from '../../../utils/test-data';

describe('wsReducerFeed', () => {
    it('should return the initial state', () => {
        expect(wsReducerFeed(undefined, {})).toEqual(
            {
                wsConnected: false,
                total: 0,
                totalToday: 0,
                orders: []
            }
        )
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducerFeed(undefined, {
            type: actions.WS_CONNECTION_SUCCESS,
        })
        ).toEqual(
            {
                wsConnected: true,
                total: 0,
                totalToday: 0,
                orders: []
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
        ).toEqual(
            {
                wsConnected: false,
                total: 0,
                totalToday: 0,
                orders: []
            }
        )
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
                wsConnected: false,
                total: 0,
                totalToday: 0,
                orders: [],
                error: "Ошибка 404"
            }
        )
    })

}) 