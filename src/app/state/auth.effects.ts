import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private store: Store,  private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        // Hardcoded credentials check
        if (action.username === 'admin' && action.password === 'admin') {
          return of(AuthActions.loginSuccess({ username: action.username }));
        } else {
          return of(AuthActions.loginFailure({ error: 'Invalid credentials' }));
        }
      })
    )
  );


  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(() => {
          this.router.navigate(['/tasks']); // Redirect after successful login
        })
      ),
    { dispatch: false }
  );

  
}
