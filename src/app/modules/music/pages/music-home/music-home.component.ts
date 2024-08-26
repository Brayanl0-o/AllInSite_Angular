import { Component, EventEmitter, Output } from '@angular/core';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
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
  songs: Song[]=[];
  showButtonAdd: boolean = true;
  showDetails: boolean = false;
  searchTerm: string = '';
  isAdmin = false;
  page: number = 1;
  notResultsOne = false;
  isLoading = true;

  constructor(private songService:  SongsService,
    private authService: AuthService,
    private router:Router){}


    ngOnInit(){
    this.songService.$songDetails.subscribe((value: boolean) => {
      this.showButtonAdd = !value;
    });
    this.getSongData();
    this.detectRoute();
    this.isAdminOrNot();
  }

  getSongData(){
    this.isLoading = true;
    this.songService.getSongs().subscribe((data: Song[]) =>{
      this.songs = data;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000); 
    })
  }
  onSearchInputChange() {
    this.searchValueChanged.emit(this.searchTerm);
  }
  detectDetails(){
    if(this.$songDetails.observers.length > 0){
      this.showButtonAdd = false;

    } else{
      this.showButtonAdd = false;

    }
  }
  searchSongs() {
    if (!this.searchTerm.trim()) {
      this.notResultsOne = false;
      return this.songs;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    const results = this.songs.filter(song =>
      song.songName.toLowerCase().includes(searchTermLower) ||
      song.singer.toLowerCase().includes(searchTermLower)
    );

    this.notResultsOne = results.length === 0;
    return results;
  }
  
  openDetailsSong(){
    this.detectRoute();
  }
  detectRoute() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('song-details')) {
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
