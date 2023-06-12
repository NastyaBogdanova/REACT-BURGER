import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    TWSStoreActions
} from '../actions/webSocket';

import type {
    AppDispatch,
    RootState,
    TAppActions
} from '../types/index';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAppActions) => {
            const { dispatch, getState } = store;
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
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: { ...restParsedData } });
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