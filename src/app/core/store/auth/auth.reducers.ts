import * as authActions from "./auth.actions";
import { initialState, featureAdapter, State } from "./auth.state";

export function AuthReducer(state = initialState, action: authActions.Actions) {
  switch (action.type) {
    case authActions.ActionTypes.START_LOGIN: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case authActions.ActionTypes.SUCCESS_LOGIN: {
      return featureAdapter.addAll(action.payload["profile"], {
        ...state,
        loading: false,
        loaded: false,
        error: null
      });
    }
    case authActions.ActionTypes.ERROR_LOGIN:
    case authActions.ActionTypes.ERROR_INVALID_CREDENTIALS: {
      return {
        ...state,
        error: action.payload["error"],
        loading: false
      };
    }
    default:
      return state;
  }
}

export const getItemsLoaded = (state: State) => state.loaded;
