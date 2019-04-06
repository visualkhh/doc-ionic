import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasResultPage } from './meas-result.page';

describe('MeasResultPage', () => {
  let component: MeasResultPage;
  let fixture: ComponentFixture<MeasResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
