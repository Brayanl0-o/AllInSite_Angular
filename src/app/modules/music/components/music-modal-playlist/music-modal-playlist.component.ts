import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  isLoading = false;
  contactForm!: FormGroup;
  errorResponseMessageForm = '';

  songId!: string;
  selectedPlaylistId!: string;
  playlistForm!: FormGroup;

  constructor(
    private songService: SongsService, private fb: FormBuilder,
    private authService: AuthService,  private route: ActivatedRoute)
    {}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.songId = params.get('songId') || '';
      console.log('get songId',this.songId);
    });
    // this.loadPlaylists();
    // this.playlistForm =  this.initFromPlaylistArray();
    this.contactForm =  this.initFrom();
    this.songService.getPlaylists().subscribe((value: Playlist[]) => {
      this.playlists = value;
    })
  }





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


  initFrom(): FormGroup{
    return this.fb.group({
      name: ['',[Validators.required,Validators.maxLength(100)]],
      privacy: ['',[]],
      createdBy: ['',[]],
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
 // initFromPlaylistArray(): FormGroup{
  //   return this.fb.group({
  //     playlists: new FormArray([])
  //   });
  // }
  // loadPlaylists(): void {
  //   this.songService.getPlaylists().subscribe(playlists => {
  //     this.playlists = playlists;
  //     this.playlists.forEach(() => this.playlistArray.push(new FormControl(false)));
  //   });
  // }

  // get playlistArray(): FormArray {
  //   return this.playlistForm.get('playlists') as FormArray;
  // }

  // onCheckboxChange(index: number): void {
  //   const formArray: FormArray = this.playlistArray;
  //   const playlistId = this.playlists[index]._id;

  //   if (formArray.controls[index].value) {
  //     this.addSongToPlaylist(playlistId);
  //   } else {
  //     this.removeSongFromPlaylist(playlistId);
  //   }
  // }

  // addSongToPlaylist(playlistId: string): void {
  //   if (this.songId && playlistId) {
  //     this.isLoading = true;
  //     this.songService.addSongToPlaylist(playlistId, this.songId).subscribe(
  //       (response) => {
  //         this.isLoading = false;
  //         console.log('Song added to playlist', response);
  //       },
  //       (error) => {
  //         this.isLoading = false;
  //         console.error('Error adding song to playlist', error);
  //         this.errorResponseMessage = 'Error adding song to playlist';
  //       }
  //     );
  //   }
  // }

  // removeSongFromPlaylist(playlistId: string): void {
  //   if (this.songId && playlistId) {
  //     this.isLoading = true;
  //     this.songService.removeSongFromPlaylist(playlistId, this.songId).subscribe(
  //       (response) => {
  //         this.isLoading = false;
  //         console.log('Song removed from playlist', response);
  //       },
  //       (error) => {
  //         this.isLoading = false;
  //         console.error('Error removing song from playlist', error);
  //         this.errorResponseMessage = 'Error removing song from playlist';
  //       }
  //     );
  //   }
  // }
