import { store } from '../store';
import { rootReducer } from '../reducers/root';
import { TConstructorActions } from '../actions/constructor';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TPasswordActions } from '../actions/password';
import { TUserActions } from '../actions/user';
import { TWSActions } from '../actions/webSocket';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Action, ActionCreator } from 'redux';

export type RootState = ReturnType<typeof rootReducer>;

export type TAppActions =
    | TConstructorActions
    | TIngredientsActions
    | TOrderActions
    | TPasswordActions
    | TUserActions
    | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, RootState, unknown, TAppActions>
>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
