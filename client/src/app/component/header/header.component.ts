import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { CartComponent } from 'src/app/features/cart/cart-content/cart.component';
import { Cart, Category, User } from 'src/app/shared/models';
import { AuthActions, ProductActions } from 'src/app/store/actions';
import { ProductSelector, UserSelector } from 'src/app/store/selectors/index.selectors';
import { State } from 'src/app/store/state/app.state';
import { FormControl } from '@angular/forms';
import { accessTokenKey } from 'src/app/shared/constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../styles.css'],
})
export class HeaderComponent implements OnInit {
  cart$: Observable<Cart>;
  readonly querySearch: FormControl = new FormControl('');
  category$: Observable<Category[]>;
  showAutocomplete$ = new BehaviorSubject(false);
  productTitles$: Observable<string[]>;
  user$: Observable<any>;
  // {
  //   token: string;
  //   user: {
  //     username: string;
  //     role: string;
  //     fullName?: string;
  //   };
  // }
  @ViewChild('appcart') appCart: CartComponent;
  constructor(private router: Router, private renderer: Renderer2, private store: Store<State>) {
    this.querySearch.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(query => {
      const querySearch = query;
      this.store.dispatch(ProductActions.getProdutSearch({ title: querySearch }));
    });
  }
  cartClick(): void {
    const cartEl = this.appCart.cartBody.nativeElement;
    this.renderer.addClass(cartEl, 'cart-open');
    const cartOverlay = this.appCart.cartOverlay.nativeElement;
    this.renderer.addClass(cartOverlay, 'overlay-visible');
  }
  ngOnInit(): void {
    this.cart$ = this.store.select(ProductSelector.GetCart);
    this.category$ = this.store.select(ProductSelector.GetCategories);
    this.productTitles$ = this.store.select(ProductSelector.GetProductTitles);
    this.user$ = this.store.select(UserSelector.GetUser);
  }

  onFocus(): void {
    this.showAutocomplete$.next(true);
  }

  onBlur(): void {
    of('blur_event')
      .pipe(delay(300), take(1))
      .subscribe(() => {
        this.showAutocomplete$.next(false);
      });
  }

  logOut() {
    localStorage.removeItem(accessTokenKey);
    this.store.dispatch(AuthActions.StoreUser({ user: null }));
  }
}
