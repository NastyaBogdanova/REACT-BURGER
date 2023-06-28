import type { Middleware, MiddlewareAPI } from 'redux';
import { getNewToken } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { wsConnectionStart } from '../actions/webSocketFeed';

import type {
    TWSStoreActions
} from '../actions/webSocketFeed';
import type {
    TWSProfileStoreActions
} from '../actions/webSocketProfile';

import type {
    AppDispatch,
    RootState,
    TAppActions
} from '../types/index';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions | TWSProfileStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAppActions) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                let url = action.payload;
                socket = new WebSocket(`${wsUrl}${url}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (parsedData.message === "Invalid or missing token") {
                        getNewToken()
                            .then(() => {
                                let accessToken = getCookie('token');
                                socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
                                dispatch(wsConnectionStart(`?token=${accessToken}`));
                            })
                    }

                    dispatch({ type: onMessage, payload: parsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const payload = action.payload;
                    const message = { ...(payload) };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};