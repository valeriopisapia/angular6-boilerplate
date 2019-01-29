import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Observable, of as observableOf } from "rxjs";

import * as featureActions from "./auth.actions";
import { Profile } from "../../models/profile.model";
import { AuthService } from "../../services/auth.service";
// export type Action = featureActions.Actions;

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.startLogin>(featureActions.ActionTypes.START_LOGIN),
    switchMap(action =>
      this.authService.login(action.payload.body).pipe(
        map(
          profile =>
            new featureActions.successfulLogin({
              profile: [profile]
            })
        ),
        catchError(error =>
          observableOf(new featureActions.failureLogin({ error }))
        )
      )
    )
  );
}
