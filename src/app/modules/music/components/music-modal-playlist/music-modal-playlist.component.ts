import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Playlist } from 'src/app/core/models/song';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';

@Component({
  selector: 'app-music-modal-playlist',
  templateUrl: './music-modal-playlist.component.html',
  styleUrls: ['./music-modal-playlist.component.css']
})
export class MusicModalPlaylistComponent {
  visibilityForm = false;
  playlists: Playlist[] = [];
  constructor(private songService: SongsService, private fb: FormBuilder, private authService: AuthService){}

  ngOnInit(){
    this.contactForm =  this.initFrom();

    this.songService.getPlaylists().subscribe((value: Playlist[]) => {
      this.playlists = value;
      // value=this.playlist;
    })
  }
  contactForm!: FormGroup;
  isLoading = false;
  errorResponseMessageForm = '';
  onFormSubmit(){
    this.isLoading = true;

    if (this.contactForm.valid) {
      this.isLoading = false;
      this.createPlaylist();
    } else {
      this.errorResponseMessageForm = 'Verifique el formulario!';
        setTimeout(() => {
          this.isLoading = false;
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }

  errorResponseMessage = '';
  createPlaylist(){
    this.isLoading = true;
    if(this.contactForm.value && this.contactForm.valid){

     const userId = this.authService.getLoggedInUserId();
      const playlistData = this.contactForm.value;

      const payload = {
        ...playlistData,
        userId: userId
      };

      // const playlistData = this.contactForm.value;
      this.songService.CreatePlaylist(payload).subscribe(
        (respose) => {
        this.isLoading = false;

          this.closeModalPlaylist();

        },
        (error) => {
          this.isLoading = false;
          console.error('Error al crear la playlist', error);
          this.errorResponseMessage = 'Imagen duplicada';
        }
      )
    }
  }
  addSongToPlaylist(){

  }

  initFrom(): FormGroup{
    return this.fb.group({
      name: ['',[Validators.required,Validators.maxLength(100)]],
      privacy: ['',[]],
      createdBy: ['',[]],
      // createdAt: ['',[ Validators.minLength(4),Validators.maxLength(80)]],
      // updatedAt: ['',[ Validators.minLength(4),Validators.maxLength(80)]],
    })
  }
  togglevisibilityForm(){
    this.visibilityForm = !this.visibilityForm;
  }
  closeModalPlaylist(){
    // this.renderer.removeStyle(document.body, 'overflow');
    this.songService.$modalPlaylist.emit(false);
  }
}
