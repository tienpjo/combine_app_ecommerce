import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-show',
  templateUrl: './cart-show.component.html',
  styleUrls: ['./cart-show.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartShowComponent {
  @Input() showSmall: boolean;
  @Input() items_qty: number;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
