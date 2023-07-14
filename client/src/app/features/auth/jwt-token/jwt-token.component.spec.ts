import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtTokenComponent } from './jwt-token.component';

describe('JwtTokenComponent', () => {
  let component: JwtTokenComponent;
  let fixture: ComponentFixture<JwtTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JwtTokenComponent]
    });
    fixture = TestBed.createComponent(JwtTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
