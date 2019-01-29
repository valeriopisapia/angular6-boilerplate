import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromAuth from "./auth/auth.reducers";
import * as fromState from "./auth/auth.state";

export interface AppState {
  auth: fromState.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer
};
