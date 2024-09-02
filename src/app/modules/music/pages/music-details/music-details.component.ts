import { Component, HostListener, ElementRef, EventEmitter, Renderer2, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/song';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.css']
})
export class MusicDetailsComponent {
  @Input() songs: Song[] = [];
  private apiUrl =  environment.apiUrl;
  musicDetails$!: Observable<Song>;
  $songUpdateDetails:EventEmitter<boolean> = new EventEmitter<boolean>();
  showUpdateModal = false;
  currentSong: Song | null = null;
  isAdmin = false;
  isLoadingRecommends = true;
  constructor(private songService: SongsService,
    private route: ActivatedRoute,
    private router:Router,
    private renderer: Renderer2,
    private authService: AuthService){
    }
  ngOnInit(){
    this.songService.$songUpdateDetails.subscribe((valu) => { this.showUpdateModal = valu })
    this.loadDetailsSong();
    this.isAdminOrNot();
    this.loadSongs();
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['currentSong']) {
  //     this.loadSongs();
  //   }
  // }
  loadSongs(){
    this.songService.getSongs().subscribe((data)=>{

      this.songs =  this.shuffleArray(this.filterSongs(data));
      setTimeout(() => {
        this.isLoadingRecommends = false;
        console.log('Filtered Songs:', this.songs, this.isLoadingRecommends);
      }, 5000); 
     
      console.log('Filtered Songs:', this.songs, this.isLoadingRecommends);
    })
  }
  filterSongs(songs: Song[]): Song[] {
    return songs.filter(song => song._id !== this.currentSong!._id);
  }
  shuffleArray(array: Song[]): Song[]{
    return array.sort(() => Math.random() - 0.5);
  }
  loadDetailsSong(){

    this.route.paramMap.subscribe((params: ParamMap) =>{
      const songId = params.get('songId');
      if(songId){
        this.musicDetails$ = this.songService.getSong(songId);
        this.musicDetails$?.subscribe(song => {
          this.renderer.setStyle(document.body, 'overflow', 'hidden');
          this.currentSong = song;

        });
      }
    })
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
  
  deleteSong(songId: string) {
    this.songService.deleteSong(songId).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error al eliminar la canción', error);
      }
    );
  }
  closeDetails(){
    this.renderer.removeStyle(document.body, 'overflow');
    this.songService.$songDetails.emit(false);
    this.navigateToUrl('/music');
  }
  navigateToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
  // showSongUpdateDetails:boolean = false;
  openUpdateDetails(){
    this.showUpdateModal = true;
    this.songService.$songUpdateDetails.emit(true);
  }
}
 // @HostListener('document:click', ['$event'])
  // onClick(event: Event) {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {

  //     this.closeDetails();
  //   }
  // }
  // openLinkToYoutube(){
  //   this.musicDetails$.subscribe((song: Song) => {
  //     const linkToYoutube = song.linkToYoutube;
  //     console.log(linkToYoutube)
  //     if(linkToYoutube){
  //       window.open(linkToYoutube, '_blank')
  //     }
  //   })
  // }
  // openLinkToSpotify(){
  //   this.musicDetails$.subscribe((song: Song) => {
  //     const linkToSpotify = song.linkToSpotify;
  //     if(linkToSpotify){
  //       window.open(linkToSpotify, '_blank')
  //     }
  //   })
  // }
