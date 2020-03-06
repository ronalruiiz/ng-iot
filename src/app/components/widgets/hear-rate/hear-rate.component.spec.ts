import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearRateComponent } from './hear-rate.component';

describe('HearRateComponent', () => {
  let component: HearRateComponent;
  let fixture: ComponentFixture<HearRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
