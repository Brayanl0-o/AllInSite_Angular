import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicAudioPlayerComponent } from './music-audio-player.component';

describe('MusicAudioPlayerComponent', () => {
  let component: MusicAudioPlayerComponent;
  let fixture: ComponentFixture<MusicAudioPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicAudioPlayerComponent]
    });
    fixture = TestBed.createComponent(MusicAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
