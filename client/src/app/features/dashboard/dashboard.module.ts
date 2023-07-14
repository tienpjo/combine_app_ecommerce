import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { Router, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { dashboardEffects } from 'src/app/store/effects/dashboard.effects';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer, keyDashboardState } from 'src/app/store/reducers/dashboard.reducer';

@NgModule({
  declarations: [AllProductsComponent, AddProductComponent, DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(keyDashboardState, dashboardReducer),
    EffectsModule.forFeature([dashboardEffects]),
    RouterModule.forChild([
      {
        path: 'index',
        component: AllProductsComponent,
      },
    ]),
  ],
})
export class DashboardModule {}
