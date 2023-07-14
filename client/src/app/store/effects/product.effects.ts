import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/services/api.service';
import { ProductActions } from '../actions';
import { map, mergeMap, switchMap } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private readonly apiService: ApiService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GetProduct),
      mergeMap(() =>
        this.apiService
          .getProduct({})
          .pipe(map(res => ProductActions.loadProductSuccess({ products: res.products })))
      )
    );
  });

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getCategories),
      mergeMap(() =>
        this.apiService
          .getCategories()
          .pipe(map(res => ProductActions.getCategoriesSuccess({ categories: res })))
      )
    );
  });

  getCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getCart),
      mergeMap(() => this.apiService.getCart().pipe(map(res => ProductActions.getCartSuccess({ cart: res }))))
    );
  });

  addToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProductToCart),
      switchMap(action =>
        this.apiService.addToCart(action.id).pipe(map(res => ProductActions.addToCartSuccess({ id: res })))
      )
    );
  });

  removeFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.removeProductFromCart),
      switchMap(action =>
        this.apiService
          .removeFromCart(action.id)
          .pipe(map(res => ProductActions.getCartSuccess({ cart: res })))
      )
    );
  });

  getProductById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProductById),
      switchMap(action =>
        this.apiService
          .getProductById(action.name)
          .pipe(map(res => ProductActions.getProductByIdSuccess({ product: res })))
      )
    );
  });

  getProductSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProdutSearch),
      switchMap(action =>
        this.apiService
          .getProductsSearch(action.title)
          .pipe(map(res => ProductActions.getProdutSearchSuccess({ productTitle: res })))
      )
    );
  });
}
