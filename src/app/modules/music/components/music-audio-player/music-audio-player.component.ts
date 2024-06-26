import { Component, ElementRef, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Song, Track } from 'src/app/core/models/song';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-music-audio-player',
  templateUrl: './music-audio-player.component.html',
  styleUrls: ['./music-audio-player.component.css']
})
export class MusicAudioPlayerComponent implements OnInit, OnChanges{
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @Input() song: Song | null = null;
  @Input() trackID = '';
  track$!:Observable<Track>;
  trackFile$!:Observable<Blob>;
  currentTime = '0:00:00';
  duration = '0:00:00';
  progressWidth = '0%';
  isPlaying = false;
  isLoading = true;
  isNaN: any;

  constructor(private songService: SongsService,
    private authService: AuthService,
  ) {}
  trackFileUrl: string | null = null;
  urlDownload = environment.apiUrl;




  ngOnInit(){
    this.loadTrack(this.trackID);
    this.isAdminOrUser();
    if (this.trackID && this.song) {
      this.trackFileUrl = this.songService.getTrackUrl(this.trackID);
      // this.loadTrackBlob(this.trackID);
      this.isLoading = false;
      // this.loadTrack(this.trackID);
    }
  }

  loadTrackBlob(trackID: string): void {
    this.songService.getTrackBlob(trackID).subscribe(blob => {
      this.trackFileUrl = window.URL.createObjectURL(blob);
    });
  }
  downloadTrack():void {
    console.log(this.song)

    if(this.trackFileUrl && this.song){
      const link = document.createElement('a');
      link.href = this.trackFileUrl;
      // link.download = `${this.song.songName}  `;
       // Añadir el enlace al cuerpo
       document.body.appendChild(link);

       // Hacer clic en el enlace
       link.click();

       // Remover el enlace del cuerpo
       document.body.removeChild(link);
      console.log(link.download)

    }
  }
  // downloadTrack(): void {
  //   if (this.trackFileUrl) {
  //     const link = document.createElement('a');
  //     link.href = this.trackFileUrl;
  //     link.setAttribute('download', '');
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // }
  isAdmin = false;
  isAdminOrUser(){
    const roleUser = this.authService.getLoggedUserRole();
    const allowedRole = 'administrador'

    if(roleUser == allowedRole){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

  selectedFile: File | null = null;
  isUpdateTrack = false;

  trackFile = '';
  newTrackFile = '';
  isEditingTrack = false;
  openModal(){
    this.isEditingTrack =! this.isEditingTrack;
  }

  onFileSelectedTrack(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if(file){
      console.log('Archivo seleccionado:', file);

      this.selectedFile = file;
    }
  }

  updateTrack(track:File){
    console.log('inside updateTrack')
    this.isUpdateTrack = true;
    console.log( track)
      const songID = this.song!._id;
      this.songService.uploadTrack(songID, track).subscribe(
        (res) => {

          console.log('inside sub')

          this.song!.trackID = this.trackID;
          this.isUpdateTrack = false;
          // this.renderer.removeStyle(document.body, 'overflow');
          window.location.reload();
        },
        (error) => {
          this.isUpdateTrack = false;

          console.error('Error updated track:', error);
        }
      )
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['trackID'] && !changes['trackID'].firstChange) {
      this.loadTrack(changes['trackID'].currentValue);
      this.isLoading = false;
    }
  }


  private async loadTrack(trackID: string) {
    this.isLoading = true;
    try {
      console.log(this.song!._id)
      this.track$ = this.songService.getTrack(trackID);
      this.trackFile$ = this.songService.getTrackFile(trackID);

      this.track$.subscribe({
        next: () => this.isLoading = false,

        error: () => this.isLoading = false

      });
      console.log('execute')

      this.trackFile$.subscribe({
        next: () => this.isLoading = false,
        error: () => this.isLoading = false
      });
    } catch (error) {
      console.error('Error loading track:', error);
      this.isLoading = false;
    }

  }
  toggleAudio() {
    const audioPlayer = this.audioPlayerRef?.nativeElement;
    if (audioPlayer) {
      if (this.isPlaying) {
        audioPlayer.pause();
        console.log('execute')
      } else {
        audioPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  formatTime(time: number): string {
    if (isNaN(time)) {
      return '--:--';
    }
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  seekTo(time: number) {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.currentTime = time;
  }

  onAudioEnded() {
    this.isPlaying = false;
  }

  ngAfterViewInit() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    if (audioPlayer) {
      audioPlayer.addEventListener('play', () => {
        this.isPlaying = true;
      });
      audioPlayer.addEventListener('pause', () => {
        this.isPlaying = false;
      });
      audioPlayer.addEventListener('ended', () => {
        this.isPlaying = false;
      });
      audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        this.progressWidth = `${progress}%`;
      });
    }
    if (audioPlayer) {
      setInterval(() => {
        if (!audioPlayer.paused) {
          this.currentTime = this.formatTime(audioPlayer.currentTime);
        }
      }, 1000); // Actualizar cada segundo
    }
  }
}
