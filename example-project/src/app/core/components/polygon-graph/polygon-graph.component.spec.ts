import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonGraphPage } from './polygon-graph.page';

describe('PolygonGraphPage', () => {
  let component: PolygonGraphPage;
  let fixture: ComponentFixture<PolygonGraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonGraphPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
