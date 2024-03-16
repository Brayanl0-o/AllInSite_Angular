import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forbidden403Component } from './forbidden-403.component';

describe('Forbidden403Component', () => {
  let component: Forbidden403Component;
  let fixture: ComponentFixture<Forbidden403Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Forbidden403Component]
    });
    fixture = TestBed.createComponent(Forbidden403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
