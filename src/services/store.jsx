import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/root';
import thunk from 'redux-thunk';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const prelodedState = {
    ingredients: []
};

export const store = createStore(rootReducer, prelodedState, enhancer);