import { wsReducerProfile } from './webSocketProfile';
import * as actions from '../../actions/webSocketProfile';
import { testFeed, testMessage } from '../../../utils/test-data';

describe('wsReducerProfile', () => {
    it('should return the initial state', () => {
        expect(wsReducerProfile(undefined, {})).toEqual(
            {
                wsConnected: false,
                ordersProfile: []
            }
        )
    })

    it('should handle WS_CONNECTION_PROFILE_SUCCESS', () => {
        expect(wsReducerProfile(undefined, {
            type: actions.WS_CONNECTION_PROFILE_SUCCESS,
        })
        ).toEqual(
            {
                wsConnected: true,
                ordersProfile: []
            }
        )
    })

    it('should handle WS_CONNECTION_PROFILE_CLOSED', () => {
        expect(wsReducerProfile({
            wsConnected: true,
            ordersProfile: [testFeed]
        }, {
            type: actions.WS_CONNECTION_PROFILE_CLOSED
        })
        ).toEqual(
            {
                wsConnected: false,
                ordersProfile: []
            }
        )
    })

    it('should handle WS_GET_PROFILE_MESSAGE', () => {
        expect(
            wsReducerProfile(undefined, {
                type: actions.WS_GET_PROFILE_MESSAGE,
                payload: testMessage
            })
        ).toEqual(
            {
                wsConnected: true,
                ordersProfile: testMessage.orders
            }
        )
    })

    it('should handle WS_CONNECTION_PROFILE_ERROR', () => {
        expect(
            wsReducerProfile(undefined, {
                type: actions.WS_CONNECTION_PROFILE_ERROR,
                payload: "Ошибка 404"
            })
        ).toEqual(
            {
                wsConnected: false,
                ordersProfile: [],
                error: "Ошибка 404"
            }
        )
    })

}) 