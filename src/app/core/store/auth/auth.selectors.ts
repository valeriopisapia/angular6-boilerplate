import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { featureAdapter, State } from './auth.state';
import { Profile } from '../../models/profile.model';
import * as fromAuth from './auth.reducers'
 
export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectProfile: (
  state: object
) => Profile[] = featureAdapter.getSelectors(selectAuthState).selectAll;


  export const getAuthLoaded = createSelector(
    selectAuthState,
    fromAuth.getItemsLoaded
  );

export const selectAuthError = createSelector(
  selectAuthState,
  getError
);

export const selectAuthIsLoading = createSelector(selectAuthState, getIsLoading);