import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonHeaderComponent } from './skeleton-header.component';

describe('SkeletonHeaderComponent', () => {
  let component: SkeletonHeaderComponent;
  let fixture: ComponentFixture<SkeletonHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonHeaderComponent]
    });
    fixture = TestBed.createComponent(SkeletonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
