import { Action } from "@ngrx/store";
import { Profile } from "../../models/profile.model";
import { createError } from "../../services";

export const ActionTypes = {
  START_LOGIN: "auth/login/START",
  SUCCESS_LOGIN: "auth/login/SUCCESS",
  ERROR_LOGIN: "auth/login/ERROR",
  ERROR_INVALID_CREDENTIALS: "auth/login/ERROR_INVALID_CREDENTIALS"
};

export class startLogin implements Action {
  readonly type = ActionTypes.START_LOGIN;

  constructor(public payload: { body: any }) {}
}

export class successfulLogin implements Action {
  readonly type = ActionTypes.SUCCESS_LOGIN;

  constructor(public payload: { profile: Profile[] }) {}
}

export const failedLogin = createError(ActionTypes.ERROR_LOGIN);

export const invalidCredentialsError = createError(
  ActionTypes.ERROR_INVALID_CREDENTIALS
);

export class failureLogin implements Action {
  readonly type = ActionTypes.ERROR_LOGIN;
  constructor(public payload: { error: string }) {}
}

export type Actions = startLogin | successfulLogin | failureLogin;
