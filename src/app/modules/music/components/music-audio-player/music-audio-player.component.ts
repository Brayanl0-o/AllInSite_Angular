import { Component, ElementRef, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from 'src/app/core/models/song';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
@Component({
  selector: 'app-music-audio-player',
  templateUrl: './music-audio-player.component.html',
  styleUrls: ['./music-audio-player.component.css']
})
export class MusicAudioPlayerComponent implements OnInit, OnChanges{
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @Input() trackID = '';
  track$!:Observable<Track>;
  trackFile$!:Observable<Blob>;
  currentTime = '0:00:00';
  duration = '0:00:00';
  progressWidth = '0%';
  isPlaying = false;

  constructor(private songService: SongsService,
    private route: ActivatedRoute) {}

  ngOnInit(){
    if (this.trackID) {
      this.loadTrack(this.trackID);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['trackID'] && !changes['trackID'].firstChange) {
      this.loadTrack(changes['trackID'].currentValue);
    }
  }
  private loadTrack(trackID: string) {
    this.track$ = this.songService.getTrack(trackID);
    this.trackFile$ = this.songService.getTrackFile(trackID);
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

  formatTime(seconds: number): string {
    // const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
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
