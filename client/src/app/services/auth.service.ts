import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../store/state/app.state';
import { UserSelector } from '../store/selectors/index.selectors';
import { Observable, filter, map, take, withLatestFrom } from 'rxjs';
import { User } from '../shared/models';
import { accessTokenKey } from '../shared/constants';
import { AuthActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  constructor(private store: Store<State>) {
    this.store
      .select(UserSelector.GetUser)
      .pipe(take(1))
      .subscribe(user => {
        if (!user && localStorage.getItem(accessTokenKey)) {
          this.store.dispatch(AuthActions.getUser());
        }
      });
  }

  get isLoggedIn(): Observable<boolean> {
    return this.store.select(UserSelector.getAuthLoading).pipe(
      filter(loading => !loading),
      withLatestFrom(this.store.select(UserSelector.GetUser)),
      take(1),
      map(([_loading, user]: [boolean, User]) => !!(!_loading && user))
    );
    // return this.store.select(UserSelector.GetUser).pipe(map((user: User) => !!user));
  }

  get token() {
    return localStorage.getItem(accessTokenKey);
  }

  get isAdmin() {
    return this.store.select(UserSelector.getAuthLoading).pipe(
      filter(loading => !loading),
      withLatestFrom(this.store.select(UserSelector.GetUser)),
      take(1),
      map(([loading, user]: [boolean, User]) => !!(user && user.role.includes('Admin')))
    );
  }
}
