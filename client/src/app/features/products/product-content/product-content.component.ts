import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/models';

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css'],
})
export class ProductContentComponent implements OnInit {
  mainImgUrl: string;
  status: boolean;
  @Input() product: Product;
  @Input() cartIds: { [productId: string]: number };
  @Output() addProduct = new EventEmitter<string>();
  @Output() removeProduct = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  onAddProduct(id: string): void {
    this.addProduct.emit(id);
  }

  onRemoveProduct(id: string): void {
    this.removeProduct.emit(id);
  }

  onClickImg(url: string) {
    this.mainImgUrl = url;
    this.status = true;
  }
  ngOnInit(): void {
    this.mainImgUrl = this.product.mainImage.url;
  }
}
