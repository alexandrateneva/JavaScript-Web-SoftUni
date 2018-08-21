import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllRentedCarsComponent } from './list-all-rented-cars.component';

describe('ListAllRentedCarsComponent', () => {
  let component: ListAllRentedCarsComponent;
  let fixture: ComponentFixture<ListAllRentedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllRentedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllRentedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
