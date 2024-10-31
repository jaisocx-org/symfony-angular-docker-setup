// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const setAuthToken = createAction(
  '[Auth] Set Auth Token',
  props<AuthState>()
);
