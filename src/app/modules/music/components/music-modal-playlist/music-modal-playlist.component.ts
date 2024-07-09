import { Component } from '@angular/core';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';

@Component({
  selector: 'app-music-modal-playlist',
  templateUrl: './music-modal-playlist.component.html',
  styleUrls: ['./music-modal-playlist.component.css']
})
export class MusicModalPlaylistComponent {
  visibilityForm = false;

  constructor(private songService: SongsService){}


  togglevisibilityForm(){
    this.visibilityForm = !this.visibilityForm;
  }
  closeModalPlaylist(){
    // this.renderer.removeStyle(document.body, 'overflow');
    this.songService.$modalPlaylist.emit(false);
  }
}
