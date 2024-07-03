import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicModalPlaylistComponent } from './music-modal-playlist.component';

describe('MusicModalPlaylistComponent', () => {
  let component: MusicModalPlaylistComponent;
  let fixture: ComponentFixture<MusicModalPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicModalPlaylistComponent]
    });
    fixture = TestBed.createComponent(MusicModalPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
