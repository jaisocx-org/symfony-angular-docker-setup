// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setAuthToken } from './auth.actions';

export interface AuthState {
  token: string | null;
  expires: number | null;
  error: any;
}

export const initialState: AuthState = {
  token: null,
  expires: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(setAuthToken, (state, { token, expires }) => {
    console.log('Reducer triggered with token:', token); // Log token
    return { ...state, token, expires, error: null };
  }),
);

