import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonMusicRecommendedComponent } from './skeleton-music-recommended.component';

describe('SkeletonMusicRecommendedComponent', () => {
  let component: SkeletonMusicRecommendedComponent;
  let fixture: ComponentFixture<SkeletonMusicRecommendedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonMusicRecommendedComponent]
    });
    fixture = TestBed.createComponent(SkeletonMusicRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
