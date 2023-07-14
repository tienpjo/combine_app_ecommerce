import { TestBed } from '@angular/core/testing';

import { ProductEffects } from './product.effects';

describe('ProductService', () => {
  let service: ProductEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
