import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/song';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-music-home',
  templateUrl: './music-home.component.html',
  styleUrls: ['./music-home.component.css']
})
export class MusicHomeComponent {
  $songDetails:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchValueChanged = new EventEmitter<string>();
  showButtonAdd: boolean = true;
  showDetails: boolean = false;
  searchTerm: string = '';
  songs: Song[]=[];
  isAdmin = false;

  constructor(private songService:  SongsService,
    private authService: AuthService,
    private router:Router,
    private renderer: Renderer2){}
  ngOnInit(){
    this.songService.$songDetails.subscribe((value: boolean) => {
      this.showButtonAdd = !value;
    });
    this.getSongData();
    this.detectRoute();
    this.isAdminOrNot();
  }
  onSearchInputChange() {
    this.searchValueChanged.emit(this.searchTerm);
  }
  detectDetails(){
    if(this.$songDetails.observers.length > 0){
      this.showButtonAdd = false;

    } else{
      this.showButtonAdd = true;

    }
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
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

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
  isAdminOrNot(){
    const getRoleUser =  this.authService.getLoggedUserRole();
    const allowedRole = 'administrador'

    if(getRoleUser == allowedRole){
      this.isAdmin = true;
    } else{
      this.isAdmin = false;
    }
  }

}
