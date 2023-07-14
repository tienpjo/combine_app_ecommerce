import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category, GetProducts, Product } from '../shared/models';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../store/state/app.state';
import { UserSelector } from '../store/selectors/index.selectors';
import { accessTokenKey } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  requestOpts = {};
  randomNumber = 0;
  constructor(private readonly http: HttpClient, private store: Store<State>) {
    this.setHeader();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProduct(req?: any): Observable<GetProducts> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { lang, page, sort, category, maxPrice } = req;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addCategory = category ? { category } : {};
    const categoryQuery = category ? '&category=' + category : '';
    const priceQuery = maxPrice ? '&maxPrice=' + maxPrice : '';
    this.requestOpts = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    const apiProducts =
      this.apiUrl + '/api/products?' + '&page=' + page + '&sort=' + sort + categoryQuery + priceQuery;

    return this.http.get<GetProducts>(apiProducts, this.requestOpts).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((data: any) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        products: data.all.map((product: any) => ({
          ...product,
          category: product.category,
        })),
        pagination: data.pagination,
        maxPrice: data.maxPrice,
        minPrice: data.minPrice,
      }))
    );
  }

  getProductById(params: string) {
    const headers = new HttpHeaders();
    this.requestOpts = { headers, withCredentials: true };
    const productUrl = this.apiUrl + '/api/products/findByName/' + params;
    return this.http.get<Product>(productUrl, this.requestOpts);
  }

  getProductsSearch(query: string) {
    const productUrl = this.apiUrl + '/api/products/search/' + query;
    return this.http.get<string[]>(productUrl, this.requestOpts);
  }

  addProduct(req: Product) {
    const addUrl = this.apiUrl + '/api/products/add';
    console.log(addUrl);
    return this.http.post(addUrl, req, this.requestOpts);
  }

  getCart() {
    const headers = new HttpHeaders();
    this.requestOpts = { headers, withCredentials: true };
    const cartUrl = this.apiUrl + '/api/cart';
    return this.http.get(cartUrl, this.requestOpts);
  }

  addToCart(params: string) {
    const headers = new HttpHeaders();
    this.requestOpts = { headers, withCredentials: true };
    this.randomNumber = this.randomNumber + 1;
    const randomNum = '&randomId=' + this.randomNumber; // add random to link
    const addCartUrl = this.apiUrl + '/api/cart/add/?id=' + params + randomNum;
    //  console.log(addCartUrl);
    return this.http.get(addCartUrl, this.requestOpts);
  }

  removeFromCart(params: string) {
    const headers = new HttpHeaders();
    this.requestOpts = { headers, withCredentials: true };
    this.randomNumber = this.randomNumber + 2;
    const randomNum = '&randomId=' + this.randomNumber;
    const removeCartUrl = this.apiUrl + '/api/cart/remove/?id=' + params + randomNum;
    return this.http.get(removeCartUrl, this.requestOpts);
  }

  getCategories(): Observable<Category[]> {
    const categoryUrl = this.apiUrl + '/api/products/category';
    return this.http.get<Category[]>(categoryUrl, this.requestOpts);
  }

  signIn(req: { username: string; password: string }) {
    const signInUrl = this.apiUrl + '/api/user/signin';
    return this.http.post(signInUrl, req, this.requestOpts);
  }

  getUser() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem(accessTokenKey));
    // this.requestOpts = { headers, withCredentials: true };
    const userUrl = this.apiUrl + '/api/user/';
    return this.http.get(userUrl, { withCredentials: true });
  }

  setHeader() {
    // this.store.select(UserSelector.GetUser).subscribe(user => {
    //   if (user && user.accessToken) {
    //     console.log('vao set header tai api');
    //     localStorage.setItem(accessTokenKey, user.accessToken);
    //   }
    // });
    const accessToken = localStorage.getItem(accessTokenKey);
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', 'Bearer ' + accessToken);
    this.requestOpts = { headers, withCredentials: true };
  }
}
