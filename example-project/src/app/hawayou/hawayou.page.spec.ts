import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HawayouPage } from './hawayou.page';

describe('HawayouPage', () => {
  let component: HawayouPage;
  let fixture: ComponentFixture<HawayouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HawayouPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HawayouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
