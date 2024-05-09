import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-music-audio-player',
  templateUrl: './music-audio-player.component.html',
  styleUrls: ['./music-audio-player.component.css']
})
export class MusicAudioPlayerComponent {
  isPlaying: boolean = false;
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  constructor() {}

  toggleAudio() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    if (audioPlayer) {
      if (this.isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    }
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
    }
  }
}
