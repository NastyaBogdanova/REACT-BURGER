export const WS_CONNECTION_PROFILE_START: 'WS_CONNECTION_PROFILE_START' = 'WS_CONNECTION_PROFILE_START';
export const WS_CONNECTION_PROFILE_SUCCESS: 'WS_CONNECTION_PROFILE_SUCCESS' = 'WS_CONNECTION_PROFILE_SUCCESS';
export const WS_CONNECTION_PROFILE_ERROR: 'WS_CONNECTION_PROFILE_ERROR' = 'WS_CONNECTION_PROFILE_ERROR';
export const WS_CONNECTION_PROFILE_CLOSED: 'WS_CONNECTION_PROFILE_CLOSED' = 'WS_CONNECTION_PROFILE_CLOSED';
export const WS_GET_PROFILE_MESSAGE: 'WS_GET_PROFILE_MESSAGE' = 'WS_GET_PROFILE_MESSAGE';
export const WS_SEND_PROFILE_MESSAGE: 'WS_SEND_PROFILE_MESSAGE' = 'WS_SEND_PROFILE_MESSAGE';

type TWsConnectionProfileStart = {
    readonly type: typeof WS_CONNECTION_PROFILE_START;
    readonly payload: string
}
type TWsConnectionProfileSuccess = {
    readonly type: typeof WS_CONNECTION_PROFILE_SUCCESS;
}
type TWsConnectionProfileError = {
    readonly type: typeof WS_CONNECTION_PROFILE_ERROR;
    readonly payload: any
}
type TWsConnectionProfileClosed = {
    readonly type: typeof WS_CONNECTION_PROFILE_CLOSED;
}
type TWsGetProfileMessage = {
    readonly type: typeof WS_GET_PROFILE_MESSAGE;
    readonly payload: any
}
type TWsSendProfileMessage = {
    readonly type: typeof WS_SEND_PROFILE_MESSAGE;
    readonly payload: any
}

export type TWSProfileActions =
    | TWsConnectionProfileStart
    | TWsConnectionProfileSuccess
    | TWsConnectionProfileError
    | TWsConnectionProfileClosed
    | TWsGetProfileMessage
    | TWsSendProfileMessage;

export const wsConnectionProfileStart = (url: string) => {
    return {
        type: WS_CONNECTION_PROFILE_START,
        payload: url
    };
};
export const wsConnectionProfileSuccess = () => {
    return {
        type: WS_CONNECTION_PROFILE_SUCCESS,
    };
};
export const wsConnectionProfileError = (error: string) => {
    return {
        type: WS_CONNECTION_PROFILE_ERROR,
        payload: error
    };
};
export const wsConnectionProfileClosed = () => {
    return {
        type: WS_CONNECTION_PROFILE_CLOSED,
    };
};
export const wsGetProfileMessage = (message: any) => {
    return {
        type: WS_GET_PROFILE_MESSAGE,
        payload: message
    };
};
export const wsSendProfileMessage = (message: any) => {
    return {
        type: WS_SEND_PROFILE_MESSAGE,
        payload: message
    };
};

export type TWSProfileStoreActions = {
    wsInit: typeof WS_CONNECTION_PROFILE_START,
    wsSendMessage: typeof WS_SEND_PROFILE_MESSAGE,
    onOpen: typeof WS_CONNECTION_PROFILE_SUCCESS,
    onClose: typeof WS_CONNECTION_PROFILE_CLOSED,
    onError: typeof WS_CONNECTION_PROFILE_ERROR,
    onMessage: typeof WS_GET_PROFILE_MESSAGE,
};