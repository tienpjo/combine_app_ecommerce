import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { accessTokenKey } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models';
import { AuthActions } from 'src/app/store/actions';
import { UserSelector } from 'src/app/store/selectors/index.selectors';
import { State } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Sign In';
  loading$: Observable<boolean>;
  user$: Observable<User>;

  signInForm: FormGroup;
  userSendRequest$ = new BehaviorSubject(false);
  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private authService: AuthService,
    private router: Router
  ) {
    this.loading$ = this.store.select(UserSelector.getAuthLoading);
    this.store.select(UserSelector.getLoginStatus).subscribe(err => {
      this.errorMessage = err;
    });
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.user$ = this.store.select(UserSelector.GetUser);
  }

  signIn(): void {
    this.store.dispatch(AuthActions.SignIn(this.signInForm.value));
    this.signInForm.reset();
    this.loading$
      .pipe(
        filter(_loading => !_loading),
        take(1)
      )
      .subscribe(() => {
        this.userSendRequest$.next(true);
      });
    this.user$.subscribe(user => (user?.accessToken ? this.router.navigate(['/jwt', user.accessToken]) : ''));
  }

  get isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn;
  }
}
