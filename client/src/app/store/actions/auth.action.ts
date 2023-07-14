import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models';

export const SignIn = createAction('[Auth] User SignIn', props<{ username: string; password: string }>());

export const SignInSuccess = createAction('[Auth] User SignIn Success', props<{ user: any }>());

export const SignInFail = createAction('[Auth] User SignIn Fail', props<{ user: any }>());

export const SignUp = createAction('[Auth] User SignUp');

export const SignUpSuccess = createAction('[Auth] User SignUp Success');

export const getUser = createAction('[Auth] Get User');

export const getUserSuccess = createAction('[Auth] Get User Success', props<{ user: any }>());

export const getUserFail = createAction('[Auth] Get User Fail');

export const StoreUser = createAction('[Auth] Store User', props<{ user: any }>());
