import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonVideogamesComponent } from './skeleton-videogames.component';

describe('SkeletonVideogamesComponent', () => {
  let component: SkeletonVideogamesComponent;
  let fixture: ComponentFixture<SkeletonVideogamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonVideogamesComponent]
    });
    fixture = TestBed.createComponent(SkeletonVideogamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
