import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map(activeStatus => {
        if (activeStatus) {
          return activeStatus;
        } else {
          this.router.navigate(['']);
          return activeStatus;
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map(activeStatus => {
        if (activeStatus) {
          return activeStatus;
        } else {
          this.router.navigate(['']);
          return activeStatus;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(route: Route): Observable<boolean> {
    return this.authService.isAdmin.pipe(
      map(activeStatus => {
        if (activeStatus) {
          return activeStatus;
        } else {
          this.router.navigate(['']);
          return activeStatus;
        }
      })
    );
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAdmin.pipe(
      map(activeStatus => {
        if (activeStatus) {
          return activeStatus;
        } else {
          this.router.navigate(['']);
          return activeStatus;
        }
      })
    );
  }
}
