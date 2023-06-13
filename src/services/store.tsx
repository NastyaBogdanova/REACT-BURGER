import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/root';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './middleware/socetMiddleware';
import {
    WS_CONNECTION_PROFILE_CLOSED,
    WS_CONNECTION_PROFILE_ERROR,
    WS_CONNECTION_PROFILE_START,
    WS_CONNECTION_PROFILE_SUCCESS,
    WS_GET_PROFILE_MESSAGE,
    WS_SEND_PROFILE_MESSAGE,
    TWSProfileStoreActions
} from './actions/webSocketProfile';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    TWSStoreActions
} from './actions/webSocketFeed';

const feedActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const profileActions: TWSProfileStoreActions = {
    wsInit: WS_CONNECTION_PROFILE_START,
    wsSendMessage: WS_SEND_PROFILE_MESSAGE,
    onOpen: WS_CONNECTION_PROFILE_SUCCESS,
    onClose: WS_CONNECTION_PROFILE_CLOSED,
    onError: WS_CONNECTION_PROFILE_ERROR,
    onMessage: WS_GET_PROFILE_MESSAGE
};

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, feedActions), socketMiddleware(wsUrl, profileActions)))
);