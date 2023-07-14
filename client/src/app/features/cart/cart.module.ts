import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartShowComponent } from './cart-show/cart-show.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CartShowComponent],
  imports: [CommonModule, NgbModule, FontAwesomeModule],
  exports: [CartShowComponent],
})
export class CartModule {}
