import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadRequest400Component } from './bad-request-400.component';

describe('BadRequest400Component', () => {
  let component: BadRequest400Component;
  let fixture: ComponentFixture<BadRequest400Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadRequest400Component]
    });
    fixture = TestBed.createComponent(BadRequest400Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
