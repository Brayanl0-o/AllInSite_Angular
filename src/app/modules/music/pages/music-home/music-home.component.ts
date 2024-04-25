import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/song';
import { Router } from '@angular/router';
@Component({
  selector: 'app-music-home',
  templateUrl: './music-home.component.html',
  styleUrls: ['./music-home.component.css']
})
export class MusicHomeComponent {
  $songDetails:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchValueChanged = new EventEmitter<string>();
  searchTerm: string = '';
  songs: Song[]=[];

  constructor(private songService:  SongsService,
    private router:Router,
    private renderer: Renderer2){}
    showDetails: boolean = false;
  ngOnInit(){
    this.getSongData();
    this.detectRoute();
  }
  onSearchInputChange() {
    this.searchValueChanged.emit(this.searchTerm);
  }

  searchSongs() {
    if (!this.searchTerm.trim()) {
      return this.songs;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    return this.songs.filter(song =>
      song.songName.toLowerCase().includes(searchTermLower) ||
      song.singer.toLowerCase().includes(searchTermLower)
    );
  }
  getSongData(){
    this.songService.getSongs().subscribe((data: Song[]) =>{
      this.songs = data;
    })
  }
  openDetailsSong(){
    this.detectRoute();
  }
  detectRoute() {
    const currentUrl = this.router.url;

    if (currentUrl.includes('song-details')) {
       this.renderer.setStyle(document.body, 'overflow', 'hidden');

      this.songService.$songDetails.emit(true);
    } else {
      this.songService.$songDetails.emit(false);
    }
  }


}
