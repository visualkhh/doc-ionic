import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasPulsePage } from './meas-pulse.page';

describe('MeasPulsePage', () => {
  let component: MeasPulsePage;
  let fixture: ComponentFixture<MeasPulsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasPulsePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasPulsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
