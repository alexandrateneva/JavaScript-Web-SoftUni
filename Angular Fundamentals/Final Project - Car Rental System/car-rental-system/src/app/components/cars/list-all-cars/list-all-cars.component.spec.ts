import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllCarsComponent } from './list-all-cars.component';

describe('ListAllCarsComponent', () => {
  let component: ListAllCarsComponent;
  let fixture: ComponentFixture<ListAllCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
