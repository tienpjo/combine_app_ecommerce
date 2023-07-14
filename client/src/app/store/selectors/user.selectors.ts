import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, keyAuthState } from '../reducers/auth.reducer';
const UserFeatureState = createFeatureSelector<UserState>(keyAuthState);

export const GetUser = createSelector(UserFeatureState, state => state.userInfo);

export const getAuthLoading = createSelector(UserFeatureState, state => state.loading);

export const getLoginStatus = createSelector(UserFeatureState, state => state.errormessage);

export const GetUserLoggIn = createSelector(UserFeatureState, state => state.userInfo);
