import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonMusicHomeComponent } from './skeleton-music-home.component';

describe('SkeletonMusicHomeComponent', () => {
  let component: SkeletonMusicHomeComponent;
  let fixture: ComponentFixture<SkeletonMusicHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonMusicHomeComponent]
    });
    fixture = TestBed.createComponent(SkeletonMusicHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
