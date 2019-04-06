import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeyResultPage } from './servey-result.page';

describe('ServeyResultPage', () => {
  let component: ServeyResultPage;
  let fixture: ComponentFixture<ServeyResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeyResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeyResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
