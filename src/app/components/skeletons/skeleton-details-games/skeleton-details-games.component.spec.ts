import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailsGamesComponent } from './skeleton-details-games.component';

describe('SkeletonDetailsGamesComponent', () => {
  let component: SkeletonDetailsGamesComponent;
  let fixture: ComponentFixture<SkeletonDetailsGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonDetailsGamesComponent]
    });
    fixture = TestBed.createComponent(SkeletonDetailsGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
