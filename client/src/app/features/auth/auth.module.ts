import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { keyAuthState, userReducer } from 'src/app/store/reducers/auth.reducer';
import { AuthEffects } from 'src/app/store/effects/user.effects';

const AUTH_ROUTER: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTER),
    StoreModule.forFeature(keyAuthState, userReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
