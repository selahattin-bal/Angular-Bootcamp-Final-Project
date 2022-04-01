import { ComponentFixture, TestBed } from '@angular/core/testing';

import { adminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: adminDashboardComponent;
  let fixture: ComponentFixture<adminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ adminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(adminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
