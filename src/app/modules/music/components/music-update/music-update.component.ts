import { Component, Input, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Song } from 'src/app/core/models/song';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
@Component({
  selector: 'app-music-update',
  templateUrl: './music-update.component.html',
  styleUrls: ['./music-update.component.css']
})
export class MusicUpdateComponent {
  @Input() song: Song = {} as Song;
  musicDetails$!: Observable<Song>;
  contactForm!: FormGroup;
  errorResponseMessageForm = '';

  constructor(private songService: SongsService,
    private fb: FormBuilder){
    }

  ngOnInit():void{
    this.contactForm = this.initForm();
    this.contactForm.patchValue(this.song);
    this.musicDetails$ = this.songService.getSong(this.song._id);
  }
  onFormSubmit(){
    if(this.contactForm.valid){
      this.updateSong();
    }else{
      this.errorResponseMessageForm = 'Verifica los campos requeridos con * ';
      setTimeout(() => {
        this.errorResponseMessageForm = '';
      }, 5000);
    }
  }
  updateSong(){
    this.musicDetails$.subscribe((song : Song)=>{
      if(!song){
        console.error("No hay datos para actualizar.")
        return;
      }
      const updatedSongData = { ...this.song, ...this.contactForm.value };
      this.songService.updateSong(this.song._id, updatedSongData).subscribe(
        (response)=> {
          this.song = response;
          this.closeUpdateDetails();
          window.location.reload()
        }
      )

    })
  }
  initForm(): FormGroup{
    return this.fb.group({
      songName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
      singer: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
      songImg: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      genre: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(35)]],
      averageRating: ['', [ Validators.minLength(1),Validators.maxLength(2)]],
      releaseDate: ['', []],
      lyrics: ['', [,Validators.maxLength(3050)]],
      linkToDeezer: ['',[Validators.maxLength(450)]],
      linkToSpotify: ['',[Validators.maxLength(450)]],
      linkToYoutube: ['',[Validators.maxLength(450)]],
    });
  }
  closeUpdateDetails(){
    console.log('execute closeupdate')
    this.songService.$songUpdateDetails.emit(false);
  }

}
