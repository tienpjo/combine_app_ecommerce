import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Cart, Category, Product, User } from 'src/app/shared/models';
import { State } from 'src/app/store/state/app.state';
import { ProductSelector, UserSelector } from 'src/app/store/selectors/index.selectors';
import { ProductActions } from 'src/app/store/actions';
export const mainRoutes: Routes = [{}];
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  cartIds$: Observable<{ [productID: string]: number }>;
  cart$: Observable<Cart>;
  user$: Observable<User>;
  loadingProduct$: Observable<boolean>;
  constructor(private apiService: ApiService, private store: Store<State>) {}
  ngOnInit(): void {
    this.products$ = this.store.select(ProductSelector.GetProducts);
    this.categories$ = this.store.select(ProductSelector.GetCategories);
    this.store.dispatch(ProductActions.getCart());
    this.cart$ = this.store.select(ProductSelector.GetCart);
    this.user$ = this.store.select(UserSelector.GetUser);
    this.loadingProduct$ = this.store.select(ProductSelector.GetProductLoading);
    this.cartIds$ = this.cart$.pipe(
      filter(cart => !!cart),
      map((cart: Cart) =>
        cart.items && cart.items.length
          ? cart.items.reduce((prev, curr) => ({ ...prev, [curr.id]: curr.qty }), {})
          : {}
      )
    );
  }
  addToCart(id: string) {
    this.store.dispatch(ProductActions.addProductToCart({ id: id }));
  }
  removeFromCart(id: string) {
    this.store.dispatch(ProductActions.removeProductFromCart({ id: id }));
  }
  trackById(_index: number, item: Product) {
    return item._id;
  }
}
