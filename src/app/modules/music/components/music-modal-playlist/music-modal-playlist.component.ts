import { Component } from '@angular/core';

@Component({
  selector: 'app-music-modal-playlist',
  templateUrl: './music-modal-playlist.component.html',
  styleUrls: ['./music-modal-playlist.component.css']
})
export class MusicModalPlaylistComponent {
  visibilityForm = false;

  constructor(){}

  togglevisibilityForm(){
    this.visibilityForm = !this.visibilityForm;
  }
}
