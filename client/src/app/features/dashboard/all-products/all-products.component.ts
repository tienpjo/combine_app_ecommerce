import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models';
import { ProductSelector } from 'src/app/store/selectors/index.selectors';
import { State } from 'src/app/store/state/app.state';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardActions } from 'src/app/store/actions';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  @ViewChild('tagInput', { static: true }) tagInputRef: ElementRef;
  products$: Observable<Product[]>;
  product: Product;
  submitProductForm: FormGroup;
  subImage: FormArray;
  tagsCategory: string[] = [];
  constructor(private store: Store<State>, private fb: FormBuilder, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.products$ = this.store.select(ProductSelector.GetProducts);
    this.submitProductForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      descriptionFull: ['', Validators.required],
      category: [undefined],
      regularPrice: ['', Validators.required],
      salePrice: ['', Validators.required],
      stock: ['', Validators.required],
      mainImage: ['', Validators.required],
      subImage: this.fb.array([this.fb.control('')]),
    });
  }
  onAddProduct(addproduct: any) {
    this.modalService.open(addproduct, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
  }
  onDeleteProduct(deleteproduct: any) {
    this.modalService.open(deleteproduct, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
  }
  submitProduct() {
    this.product = {
      ...this.submitProductForm.value,
      category: this.tagsCategory,
      mainImage: {
        url: this.submitProductForm.value['mainImage'],
        name: this.submitProductForm.value['title'],
      },
      visibility: true,
      onSale: this.submitProductForm.value['salePrice'] ? true : false,
      regularPrice: +this.submitProductForm.value['regularPrice'],
      salePrice: this.submitProductForm.value['salePrice'] ? +this.submitProductForm.value['salePrice'] : '',
      stock: this.checkedChanged() ? 'On Stock' : 'Out Stock',
      titleUrl: this.submitProductForm.value['title'].split(' ').join('-'),
    };
    this.store.dispatch(DashboardActions.addProduct({ product: this.product }));
    this.submitProductForm.reset();
  }

  deleteProduct() {}

  addSubImage() {
    this.subImg.push(this.fb.control(''));
  }

  get subImg() {
    return this.submitProductForm.get('subImage') as FormArray;
  }

  get pCategory() {
    return this.submitProductForm.get('category');
  }

  onCategoryKeyUp(event: KeyboardEvent) {
    const inputCategory = this.pCategory.value;
    if (event.code === 'Space' && !inputCategory) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputCategory);
        this.pCategory.setValue('');
      }
    }
  }
  checkedChanged() {
    return true;
  }
  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !this.tagsCategory.includes(tag)) {
      this.tagsCategory.push(tag);
    }
  }

  removeTag(tag?: string): void {
    this.tagsCategory.splice(-1);
  }
  focusCategoryInput() {
    //this.tagInputRef.nativeElement.focus();
  }
}
