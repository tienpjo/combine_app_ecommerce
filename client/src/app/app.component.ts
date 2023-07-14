import { Component, Injector, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, ProductActions } from './store/actions';
import { State } from './store/reducers/product.reducer';
import { UserSelector } from './store/selectors/index.selectors';
import { take } from 'rxjs';
import { accessTokenKey } from './shared/constants';

@Component({
  selector: 'app-shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private store: Store<State>) {
    this.store
      .select(UserSelector.GetUser)
      .pipe(take(1))
      .subscribe(user => {
        if (!user && localStorage.getItem(accessTokenKey)) {
          this.store.dispatch(AuthActions.getUser());
        }
      });
  }
  ngOnInit(): void {
    this.store.dispatch(ProductActions.GetProduct({ loading: true }));
    this.store.dispatch(ProductActions.getCategories({ loading: true }));
  }
}
