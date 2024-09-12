import { Component, ElementRef, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
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
  @ViewChild('volumeControl', { static: true }) volumeControlRef!: ElementRef<HTMLInputElement>;
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
  selectedFile: File | null = null;
  isUpdateTrack = false;
  trackFile = '';
  newTrackFile = '';
  isEditingTrack = false;
  trackFileUrl: string | null = null;
  urlDownload = environment.apiUrl;
  volume = 1;
  volumeControl = false;
  isAdmin = false;
  showModalPlaylist = false;
  currentSong = '';
  songList: string[] = []; 

  constructor(private songService: SongsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router:Router,
  ) {}

  audioDuration = 0;
  audioCurrentTime = 0;
  ngOnInit(){
    this.fetchSongs();
    this.savePreviusSong();
    this.songService.$modalPlaylist.subscribe((valu) => {
      this.showModalPlaylist = valu
    })

    this.loadTrack(this.trackID);
    this.isAdminOrUser();
    this.loadVolume();
    if (this.trackID && this.song) {
      this.trackFileUrl = this.songService.getTrackUrl(this.trackID);
      // this.loadTrackBlob(this.trackID);
      this.isLoading = false;
      this.loadTrack(this.trackID);
    }
  }
  ngAfterViewInit() {
    const audioPlayer = this.audioPlayerRef.nativeElement;

    if (audioPlayer) {
      audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
    }
    this.updateVolumeControlStyle(this.volume);

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
        // audioPlayer.addEventListener('timeupdate', () => {
        //   const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        //   this.progressWidth = `${progress}%`;
        // });
    }
    if (audioPlayer) {
      setInterval(() => {
        if (!audioPlayer.paused) {
          this.currentTime = this.formatTime(audioPlayer.currentTime);
        }
      }, 1000); // Actualizar cada segundo
    }
  }
  updateProgress(): void {
    const audioPlayer = this.audioPlayerRef?.nativeElement;
    if (audioPlayer) {
      this.audioCurrentTime = audioPlayer.currentTime;
      this.audioDuration = audioPlayer.duration;
    }
  }
  seekAudio(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newTime = parseFloat(inputElement.value);
    const audioPlayer = this.audioPlayerRef?.nativeElement;
    if (audioPlayer) {
      audioPlayer.currentTime = newTime;
    }
  }


  isAdminOrUser(){
    const roleUser = this.authService.getLoggedUserRole();
    const allowedRole = 'administrador'
    if(roleUser == allowedRole){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }
  // Function to load track
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

  // previus and next song
  fetchSongs() {
    this.songService.getSongs().subscribe(songs => {
      this.songList = songs.map(song => song._id); 
    });
  }
  savePreviusSong(){
    this.route.paramMap.subscribe((params: ParamMap) =>{
      const songId = params.get('songId');
      if(songId){
          this.currentSong = songId;
          console.log(this.currentSong);
      }
    })
    localStorage.setItem('song_previus',this.currentSong)
  }
  previusSong(){
    const currentIndex = this.songList.indexOf(this.currentSong);
    if (currentIndex > 0) {
      const previousSong = this.songList[currentIndex - 1];
      this.router.navigateByUrl(`music/song-details/${previousSong}`);
    }
  }
  nextSong(){
    const currentIndex = this.songList.indexOf(this.currentSong);
    if (currentIndex < this.songList.length - 1) {
      const nextSong = this.songList[currentIndex + 1];
      this.router.navigateByUrl(`music/song-details/${nextSong}`);
    }
  }

  // playlists
  togglePlaylistsVisibility(){
    this.showModalPlaylist =! this.showModalPlaylist;
  }

  //Handle volumen's visibility and controls
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
  showVolumeControl(): void {
    this.volumeControl = !this.volumeControl;
    if (this.volumeControl) {
      setTimeout(() => {
        this.updateVolumeControlStyle(this.volume);
      }, 0);
    }
  }
  changeVolume(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.volume = parseFloat(inputElement.value);

    // Actualizar el volumen del reproductor de audio
    const audioPlayer = this.audioPlayerRef?.nativeElement;
    if (audioPlayer) {
      audioPlayer.volume = this.volume;
    }

    // Actualizar el estilo del pseudo-elemento ::before
    inputElement.style.setProperty('--value', this.volume.toString());
    this.updateVolumeControlStyle(this.volume);
  }
  loadVolume(): void {
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
    }
  }
  updateVolumeControlStyle(volume: number): void {
    if (this.volumeControlRef) {
      const inputElement = this.volumeControlRef.nativeElement;
      inputElement.style.setProperty('--value', volume.toString());
    }
  }
  saveVolume(): void{
    localStorage.setItem('volume', this.volume.toString())
  }

 
  // loadTrackBlob(trackID: string): void {
  //   this.songService.getTrackBlob(trackID).subscribe(blob => {
  //     this.trackFileUrl = window.URL.createObjectURL(blob);
  //   });
  // }
  // download song's track
  downloadTrack():void {
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
    }
  }

  // Handle editing track
  openModal(){
    this.isEditingTrack =! this.isEditingTrack;
  }
  onFileSelectedTrack(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if(file){
      this.selectedFile = file;
    }
  }
  updateTrack(track:File){
    this.isUpdateTrack = true;
      const songID = this.song!._id;
      this.songService.uploadTrack(songID, track).subscribe(
        (res) => {


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

  // Handle track time
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trackID'] && !changes['trackID'].firstChange) {
      this.loadTrack(changes['trackID'].currentValue);
      this.isLoading = false;
    }
  }
  
}
