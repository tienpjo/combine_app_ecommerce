import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutDetailComponent } from './checkout-detail/checkout-detail.component';
import { CheckoutListComponent } from './checkout-list/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CheckoutDetailComponent, CheckoutListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'checkout',
        component: CheckoutListComponent,
      },
    ]),
  ],
  exports: [CheckoutListComponent, CheckoutDetailComponent],
})
export class CheckoutModule {}
