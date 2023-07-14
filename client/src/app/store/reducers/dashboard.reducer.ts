import { Category, Product } from 'src/app/shared/models';
import * as AppState from './../state/app.state';
import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from '../actions';

export interface State extends AppState.State {
  dashboard: DashboardSate;
}

export const keyDashboardState = 'Dashboard';

export interface DashboardSate {
  loading: boolean;
  allProducts: Array<Product>;
  allCategories: Array<Category>;
}

export const initialState: DashboardSate = {
  allProducts: null,
  allCategories: null,
  loading: false,
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.addProduct, (state): DashboardSate => {
    return {
      ...state,
      loading: true,
      //  allProducts: action.product
    };
  }),
  on(DashboardActions.addProductSuccess, (state, action): DashboardSate => {
    return {
      ...state,
      loading: false,
      allProducts: action.productAll,
    };
  })
);
