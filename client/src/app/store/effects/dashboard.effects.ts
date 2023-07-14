import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/services/api.service';
import { DashboardActions } from '../actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs';

@Injectable()
export class dashboardEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.addProduct),
      switchMap(action => this.apiService.addProduct(action.product)),
      map(res => DashboardActions.addProductSuccess({ productAll: res }))
    );
  });
}
