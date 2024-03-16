import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUnavailable503Component } from './service-unavailable-503.component';

describe('ServiceUnavailable503Component', () => {
  let component: ServiceUnavailable503Component;
  let fixture: ComponentFixture<ServiceUnavailable503Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceUnavailable503Component]
    });
    fixture = TestBed.createComponent(ServiceUnavailable503Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
