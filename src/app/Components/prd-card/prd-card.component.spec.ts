import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdCardComponent } from './prd-card.component';

describe('PrdCardComponent', () => {
  let component: PrdCardComponent;
  let fixture: ComponentFixture<PrdCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrdCardComponent]
    });
    fixture = TestBed.createComponent(PrdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
