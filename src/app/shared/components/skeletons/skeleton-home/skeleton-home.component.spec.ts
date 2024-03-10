import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonHomeComponent } from './skeleton-home.component';

describe('SkeletonHomeComponent', () => {
  let component: SkeletonHomeComponent;
  let fixture: ComponentFixture<SkeletonHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonHomeComponent]
    });
    fixture = TestBed.createComponent(SkeletonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
