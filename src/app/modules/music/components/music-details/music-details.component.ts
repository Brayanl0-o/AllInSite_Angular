import { Component, HostListener, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/song';
@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.css']
})
export class MusicDetailsComponent {
  private apiUrl =  environment.apiUrl;
  musicDetails$!: Observable<Song>;
  $songUpdateDetails:EventEmitter<boolean> = new EventEmitter<boolean>();
  showUpdateModal: boolean = false;
  currentSong: Song | null = null;
  constructor(private songService: SongsService,
    private route: ActivatedRoute,
    private router:Router,
    private renderer: Renderer2){
    }
  ngOnInit(){
    this.songService.$songUpdateDetails.subscribe((valu) => { this.showUpdateModal = valu })
    this.loadDetailsSong();
  }
  loadDetailsSong(){
    this.route.paramMap.subscribe((params: ParamMap) =>{
      const songId = params.get('songId');
      if(songId){
        this.musicDetails$ = this.songService.getSong(songId);
        this.musicDetails$?.subscribe(song => {
          this.currentSong = song;
        });
      }
    })
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
