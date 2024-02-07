import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequirementsComponent } from './add-requirements.component';

describe('AddRequirementsComponent', () => {
  let component: AddRequirementsComponent;
  let fixture: ComponentFixture<AddRequirementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRequirementsComponent]
    });
    fixture = TestBed.createComponent(AddRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
