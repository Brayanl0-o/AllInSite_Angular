import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Renderer2, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { environment } from 'src/environments/environment';
const apiBaseUrl = environment.apiUrl
@Component({
  selector: 'app-edit-videogame',
  templateUrl: './edit-videogame.component.html',
  styleUrls: ['./edit-videogame.component.css']
})
export class EditVideogameComponent {


  constructor(private videoGamesService: VideogamesService,
    private renderer: Renderer2,
    private http: HttpClient,
    private fb: FormBuilder) { }
    @Input() game: Game = {} as Game;
    contactForm!: FormGroup;
    selectedFile: File | null = null;
    imageUrl = '';

    ngOnInit(): void{
      this.contactForm =  this.initFrom();
      this.imageUrl = `${apiBaseUrl}uploads/videogames/`;
      this.contactForm.patchValue(this.game);


      if (this.game?.gameImg) {
        this.contactForm.get('gameImg')?.setValue(this.game?.gameImg);
      }

      console.log(this.contactForm)
    }

  onFileSelected(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file){
      this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.contactForm.get('gameImg')?.setValue(reader.result);
    };
    reader.readAsDataURL(file);
    }
  }
  errorResponseMessageForm = '';
  onFormSubmit(){

    if (this.contactForm.valid) {
      this.updateDataGame(this.selectedFile!);
    } else {
      this.errorResponseMessageForm = 'Verifica los campos requeridos con * ';
        setTimeout(() => {
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }

  errorResponseMessage = '';
  updateDataGame(gameImg: File): void {
   if(!this.game){
    console.error('Error: No se proporcionaron datos para la actualización.');
    return;
   }

   this.game = { ...this.game, ...this.contactForm.value};

   this.videoGamesService.updateGame(this.game._id, this.game, gameImg).subscribe(
    (response) =>{
      this.closeModalAndReloadPage();
      console.log('Datos act con exito:', response);
    },
    (error) => {
      console.error('Error al actualizar los datos:', error);
    }
    )
  }

    initFrom(): FormGroup{
      return this.fb.group({
        gameName: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
        gameImg: [this.game.gameImg],
        platform:['',[Validators.required,Validators.minLength(5),Validators.maxLength(40)]],
        releaseDate: ['',[Validators.required]],
        developer:['',[Validators.minLength(4), Validators.maxLength(40)]],
        genre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
        averageRating:['',[Validators.required,this.rangoNumericoValidator, Validators.pattern('^[0-9]+$',), Validators.pattern('^[^-]+$')]],
        descriptionGame:['',[Validators.required, Validators.maxLength(450)]]

      })
    }
    rangoNumericoValidator(control:AbstractControl) {
      const valor = control.value;

      if (isNaN(valor) || valor < 0 || valor > 10) {
        return { 'rangoNumerico': true };
      }

      return null;
    }

    closeModalAndReloadPage() {
      this.closeModal();
      window.location.reload();
    }

    closeModal() {
      console.log('close modal')
      this.renderer.removeStyle(document.body, 'overflow');
      this.videoGamesService.$modal.emit(false)
      console.log('Modal cerrado');
    }
  // percentDone: number = 0;
  // uploadSuccess!: boolean;

  // uploadImageAndProgress(files:File[]) {
  //   console.log(files);
  //   var formData = new FormData();
  //   Array.from(files).forEach((f)=> formData.append('gameImg',f))
  //   const apiUrl = `${environment.apiUrl}uploadImg/videogames`;

  //   this.http.post(apiUrl,formData, {
  //     reportProgress:true,
  //     observe:'events',
  //   })
  //   .subscribe((event) => {
  //     if(event.type === HttpEventType.UploadProgress){
  //       if(event.total)
  //       this.percentDone = Math.round((100* event.loaded) / event.total);
  //     }else if(event instanceof HttpResponse){
  //       this.uploadSuccess = true;
  //     }
  //   });
  // }

  // uploadImage():void{
  //   if(this.selectedFile){
  //     this.uploadImageAndProgress([this.selectedFile])
  //   }else {
  //     console.error('Error upload image')
  //   }
  // }


}

