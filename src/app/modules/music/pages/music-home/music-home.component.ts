import { Component, EventEmitter, Renderer2 } from '@angular/core';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/song';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-music-home',
  templateUrl: './music-home.component.html',
  styleUrls: ['./music-home.component.css']
})
export class MusicHomeComponent {
  private apiUrl = environment.apiUrl;
  $songDetails:EventEmitter<boolean> = new EventEmitter<boolean>();
  songs: Song[]=[];

  constructor(private songService:  SongsService,
    private router:Router,
    private renderer: Renderer2){}
    showDetails: boolean = false;
  ngOnInit(){
    this.getSongData();
    this.detectRoute();
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
