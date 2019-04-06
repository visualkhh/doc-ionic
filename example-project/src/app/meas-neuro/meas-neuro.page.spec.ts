import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasNeuroPage } from './meas-neuro.page';

describe('MeasNeuroPage', () => {
  let component: MeasNeuroPage;
  let fixture: ComponentFixture<MeasNeuroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasNeuroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasNeuroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
