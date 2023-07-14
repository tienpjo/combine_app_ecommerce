import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  // images = [1, 2].map(n => `https://www.thetahmid.com/themes/xemart-v1.0/images/girl-${n}.png`);

  @Input() product: Product;
  @Input() intervalSlider = 3500;
  constructor(config: NgbCarouselConfig) {
    config.interval = this.intervalSlider;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;
  }
}
