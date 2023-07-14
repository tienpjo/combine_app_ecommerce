import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './component/footer/footer.component';
import { MainComponent } from './component/main/main.component';
import { SharedModule } from './shared/component/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductModule } from './features/products/products.module';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './features/cart/cart-content/cart.component';
import { CartModule } from './features/cart/cart.module';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './features/auth/auth.module';
import { AuthInterceptorProvider } from './services/auth.interceptor';
import { DashboardModule } from './features/dashboard/dashboard.module';
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, MainComponent, CartComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    FontAwesomeModule,
    ProductModule,
    FormsModule,
    CartModule,
    ReactiveFormsModule,
    AuthModule,
    DashboardModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ name: 'Client Redux', maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
  ],
  providers: [AuthInterceptorProvider, ApiService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
