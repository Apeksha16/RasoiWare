import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutJourneyComponent } from './checkout-journey.component';

describe('CheckoutJourneyComponent', () => {
  let component: CheckoutJourneyComponent;
  let fixture: ComponentFixture<CheckoutJourneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutJourneyComponent]
    });
    fixture = TestBed.createComponent(CheckoutJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
