import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsdetailComponent } from './productsdetail.component';

describe('ProductsdetailComponent', () => {
  let component: ProductsdetailComponent;
  let fixture: ComponentFixture<ProductsdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
