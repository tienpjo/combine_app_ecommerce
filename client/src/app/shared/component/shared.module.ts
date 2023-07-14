import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductContentComponent } from '../../features/products/product-content/product-content.component';
import { ProductListComponent } from '../../features/products/product-list/product-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCartArrowDown,
  faCartPlus,
  faBars,
  faCartShopping,
  faShoppingCart,
  faTrash,
  faClose,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [MenuBarComponent, SideBarComponent, CarouselComponent, LoginComponent],
  imports: [CommonModule, NgbModule, FontAwesomeModule, RouterModule],
  providers: [],
  exports: [MenuBarComponent, SideBarComponent, CarouselComponent],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBars,
      faCartShopping,
      faShoppingCart,
      faCartArrowDown,
      faCartPlus,
      faTrash,
      faClose,
      faStar
    );
  }
}
