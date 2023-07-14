import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/shared/models';
import { ProductActions } from 'src/app/store/actions';
import { ProductSelector } from 'src/app/store/selectors/index.selectors';
import { State } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('cartbody') cartBody: ElementRef<HTMLDivElement>;
  @ViewChild('cartoverlay') cartOverlay: ElementRef<HTMLDivElement>;
  @ViewChild('cartClose') cartClose: ElementRef<HTMLButtonElement>;
  cart$: Observable<Cart>;
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart$ = this.store.select(ProductSelector.GetCart);
  }

  closeCart() {
    const cartEl = this.cartBody.nativeElement;
    this.renderer.removeClass(cartEl, 'cart-open');
    const overlayEl = this.cartOverlay.nativeElement;
    this.renderer.removeClass(overlayEl, 'overlay-visible');
  }
  removeCart(id: string) {
    this.store.dispatch(ProductActions.removeProductFromCart({ id: id }));
  }
  checkOut() {
    this.closeCart();
    this.router.navigate(['/cart/checkout']);
  }
}
