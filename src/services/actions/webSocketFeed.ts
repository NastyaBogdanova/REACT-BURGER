export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

type TWsConnectionStart = {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string
}
type TWsConnectionSuccess = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
type TWsConnectionError = {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any
}
type TWsConnectionClosed = {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
type TWsGetMessage = {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any
}
type TWsSendMessage = {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any
}

export type TWSActions =
    | TWsConnectionStart
    | TWsConnectionSuccess
    | TWsConnectionError
    | TWsConnectionClosed
    | TWsGetMessage
    | TWsSendMessage;

export const wsConnectionStart = (url: string) => {
    return {
        type: WS_CONNECTION_START,
        payload: url
    };
};
export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS,
    };
};
export const wsConnectionError = (error: string) => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: error
    };
};
export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};
export const wsGetMessage = (message: any) => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};
export const wsSendMessage = (message: any) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};

export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE,
};
