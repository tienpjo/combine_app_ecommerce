import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, User } from 'src/app/shared/models';
import { ProductSelector, UserSelector } from 'src/app/store/selectors/index.selectors';
import { State } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.css'],
})
export class CheckoutDetailComponent implements OnInit {
  checkoutForm: FormGroup;
  cart$: Observable<Cart>;
  user$: Observable<User>;
  constructor(private fb: FormBuilder, private store: Store<State>) {}
  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      fristName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.cart$ = this.store.select(ProductSelector.GetCart);
    this.user$ = this.store.select(UserSelector.GetUser);
  }
  checkOut() {}
}
