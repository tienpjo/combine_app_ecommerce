import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models';

export const addProduct = createAction('[Dashboard] Add Product', props<{ product: Product }>());

export const addProductSuccess = createAction(
  '[Dashboard] Add Product Success',
  props<{ productAll: any }>()
);
export const deleteProduct = createAction('[Dashboard] Delete Product');

export const updateProduct = createAction('[Dashboard] Update Product');
