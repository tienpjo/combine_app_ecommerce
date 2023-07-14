import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, keyProductState } from '../reducers/product.reducer';

const ProductFeatureState = createFeatureSelector<ProductState>(keyProductState);

export const GetProducts = createSelector(ProductFeatureState, state => state.products);

export const GetCart = createSelector(ProductFeatureState, state => state.cart);

export const GetCategories = createSelector(ProductFeatureState, state => state.categories);

export const GetProduct = createSelector(ProductFeatureState, state => state.product);

export const GetProductTitles = createSelector(ProductFeatureState, state => state.productTitle);

export const GetProductLoading = createSelector(ProductFeatureState, state => state.loading);
