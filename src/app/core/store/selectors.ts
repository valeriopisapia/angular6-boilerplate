import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  AuthStoreSelectors
} from './auth';

export const selectError: MemoizedSelector<object, string> = createSelector(
  AuthStoreSelectors.selectAuthError,
  (itemError: string) => {
    return itemError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(
    AuthStoreSelectors.selectAuthIsLoading,
    (loaded: boolean) => {
      return loaded;
    }
  );