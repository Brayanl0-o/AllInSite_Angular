import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerError500Component } from './internal-server-error-500.component';

describe('InternalServerError500Component', () => {
  let component: InternalServerError500Component;
  let fixture: ComponentFixture<InternalServerError500Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalServerError500Component]
    });
    fixture = TestBed.createComponent(InternalServerError500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
