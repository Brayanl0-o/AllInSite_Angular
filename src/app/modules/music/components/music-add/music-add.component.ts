import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
@Component({
  selector: 'app-music-add',
  templateUrl: './music-add.component.html',
  styleUrls: ['./music-add.component.css']
})
export class MusicAddComponent {
  contactForm!: FormGroup;
  errorResponseMessageForm = '';
  errorResponseMessage = '';
  showFormAdd = false;
  constructor(private fb:FormBuilder,
    private songsService: SongsService,
    private renderer: Renderer2){}

  ngOnInit(){
    this.contactForm = this.initForm();
  }
  onFormSubmit(){
    if(this.contactForm.valid){
      this.addSong();
    }else{
      this.errorResponseMessageForm = 'Verifica los campos requeridos con * ';
      setTimeout(() => {
        this.errorResponseMessageForm = '';
      }, 5000);
    }
  }
  addSong(){
    console.log('execute addSong',this.contactForm.value)
    if (this.contactForm.valid) {
      const trackData = this.contactForm.value.trackData;
      this.songsService.uploadTrack( trackData ).subscribe(
          (response) => {
            this.closeAddSong()

          },
          (error) => {
          console.error('Error al agregar el track de la canción', error);
        }
      )
      const songData = this.contactForm.value;
      this.songsService.createSong(songData).subscribe(
        (response) => {
          this.closeAddSong()
          window.location.reload()
        },
        (error) => {
          console.error('Error al agregar la canción', error);
          // this.errorResponseMessage = 'Imagen duplicada';
        }
      );
    }
  }

  initForm():FormGroup {
    return this.fb.group({
      songName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
      singer: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
      songImg: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      genre: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(35)]],
      averageRating: ['', [ Validators.minLength(1),Validators.maxLength(2)]],
      releaseDate: ['', []],
      lyrics: ['', [Validators.maxLength(3050)]],
      linkToDeezer: ['',[Validators.maxLength(450)]],
      linkToSpotify: ['',[Validators.maxLength(450)]],
      linkToYouTube: ['',[Validators.maxLength(450)]],

    })

  }
  openFormAdd(){
    this.showFormAdd = !this.showFormAdd;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

  }
  closeAddSong(){
    this.showFormAdd = !this.showFormAdd;
    this.renderer.removeStyle(document.body, 'overflow');
  }

}
// addSong(){
  //   console.log('execute addSong',this.contactForm.value)
  //   if (this.contactForm.valid) {
  //     const songData = this.contactForm.value;

  //     const formData = new FormData();
  //     formData.append('songName', this.contactForm.get('songName')!.value);
  //     formData.append('singer', this.contactForm.get('singer')!.value);
  //     formData.append('genre', this.contactForm.get('genre')!.value);
  //     formData.append('averageRating', this.contactForm.get('averageRating')!.value);
  //     formData.append('songImg', this.contactForm.get('songImg')!.value);
  //     formData.append('duration', this.contactForm.get('duration')!.value);
  //     formData.append('releaseDate', this.contactForm.get('releaseDate')!.value);
  //     formData.append('lyrics', this.contactForm.get('lyrics')!.value);
  //     console.log(formData)
  //     this.songsService.createSong(formData).subscribe(
  //       (response) => {
  //         this.closeAddSong()
  //         window.location.reload()
  //       },
  //       (error) => {
  //         console.error('Error al agregar el juego', error);
  //         this.errorResponseMessage = 'Imagen duplicada';
  //       }
  //     );
  //   }
  // }
