import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOldComponent } from './home-old.component';

describe('HomeOldComponent', () => {
  let component: HomeOldComponent;
  let fixture: ComponentFixture<HomeOldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeOldComponent]
    });
    fixture = TestBed.createComponent(HomeOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
