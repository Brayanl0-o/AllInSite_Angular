import { Component, ElementRef, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Song, Track } from 'src/app/core/models/song';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
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
  ) {}


  ngOnInit(){
    if (this.trackID) {
      this.isLoading = false;
      this.loadTrack(this.trackID);
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
      this.track$ = this.songService.getTrack(trackID);
      this.trackFile$ = this.songService.getTrackFile(trackID);

      this.track$.subscribe({
        next: () => this.isLoading = false,
        error: () => this.isLoading = false
      });
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
