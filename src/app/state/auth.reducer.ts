import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { username }) => ({
    ...state,
    isAuthenticated: true,
    username,
  })),
  on(AuthActions.loginFailure, (state) => ({
    ...state,
    isAuthenticated: false,
    username: null,
  })),
  on(AuthActions.logout, () => ({
    isAuthenticated: false,
    username: null,
  }))
);

