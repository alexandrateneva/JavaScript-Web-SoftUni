import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAnimationComponent } from './car-animation.component';

describe('CarAnimationComponent', () => {
  let component: CarAnimationComponent;
  let fixture: ComponentFixture<CarAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
