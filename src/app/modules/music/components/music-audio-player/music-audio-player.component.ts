import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-music-audio-player',
  templateUrl: './music-audio-player.component.html',
  styleUrls: ['./music-audio-player.component.css']
})
export class MusicAudioPlayerComponent {
  isPlaying: boolean = false;
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('slider_bar::before') progressElement: ElementRef<HTMLDivElement> | undefined;
  constructor(private renderer: Renderer2) {}
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
  currentTime: string = '0:00:00';
  duration: string = '0:00:00';


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
