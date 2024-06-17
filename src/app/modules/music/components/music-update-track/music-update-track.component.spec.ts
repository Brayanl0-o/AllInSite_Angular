import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUpdateTrackComponent } from './music-update-track.component';

describe('MusicUpdateTrackComponent', () => {
  let component: MusicUpdateTrackComponent;
  let fixture: ComponentFixture<MusicUpdateTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicUpdateTrackComponent]
    });
    fixture = TestBed.createComponent(MusicUpdateTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
