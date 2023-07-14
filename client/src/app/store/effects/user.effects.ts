import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/services/api.service';
import { AuthActions } from '../actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private readonly apiService: ApiService) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SignIn),
      exhaustMap(action =>
        this.apiService.signIn(action).pipe(
          map(res => AuthActions.SignInSuccess({ user: res })),
          catchError(err => of(AuthActions.SignInFail({ user: err })))
        )
      )
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getUser),
      //TODO: fixxx
      mergeMap(() => this.apiService.getUser().pipe(map(res => AuthActions.StoreUser({ user: res })))),
      catchError(() => of(AuthActions.getUserFail()))
    );
  });
}
