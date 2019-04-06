import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClausePage } from './clause.page';

describe('ClausePage', () => {
  let component: ClausePage;
  let fixture: ComponentFixture<ClausePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClausePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClausePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
