import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderGamesComponent } from './slider-games.component';

describe('SliderGamesComponent', () => {
  let component: SliderGamesComponent;
  let fixture: ComponentFixture<SliderGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderGamesComponent]
    });
    fixture = TestBed.createComponent(SliderGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
