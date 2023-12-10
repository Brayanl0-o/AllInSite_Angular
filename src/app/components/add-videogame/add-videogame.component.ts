import { Component, Input } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { Renderer2 } from '@angular/core';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-videogame',
  templateUrl: './add-videogame.component.html',
  styleUrls: ['./add-videogame.component.css']
})
export class AddVideogameComponent {
  constructor(private videoGamesService: VideogamesService,
    private renderer: Renderer2,
    // private http: HttpClient,
    private fb: FormBuilder) { }


  contactForm!: FormGroup;
  selectedFile: File | null = null;

  ngOnInit(): void{
    this.contactForm =  this.initFrom();
  }

  onFileSelected(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file){
      this.selectedFile = file;
    }
  }
  errorResponseMessageForm = '';
  onFormSubmit(){
    if (this.contactForm.valid) {
      // El formulario es válido, puedes enviar los datos.
      this.createGameData();
    } else {
      // El formulario tiene errores, puedes mostrar un mensaje o manejarlos de otra manera.
      this.errorResponseMessageForm = 'Verifica los campos requeridos con * ';
        setTimeout(() => {
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }

    errorResponseMessage = '';
    createGameData() {
      console.log('execute create game')
      if (this.selectedFile && this.contactForm.valid) {
        console.log('Funcion createGameDatax2EjecuteSuccess');
        const gameData = this.contactForm.value;

        const formData = new FormData();

        console.log('formData', formData);
        formData.append('gameName', gameData.gameName);
        formData.append('platform', gameData.platform);
        formData.append('releaseDate', gameData.releaseDate);
        formData.append('developer', gameData.developer);
        formData.append('genre', gameData.genre);
        formData.append('averageRating', gameData.averageRating);
        formData.append('descriptionGame', gameData.descriptionGame);
        formData.append('gameImg', this.selectedFile);

        // formData.append('gameImg', this.selectedFile);
        this.videoGamesService.createGame(gameData, this.selectedFile).subscribe(
          (response) => {
            console.log('Juego agregado correctamente', response);
            this.closeModalAndReloadPage()
          },
          (error) => {
            console.error('Error al agregar el juego', error);
            this.errorResponseMessage = 'Imagen duplicada';

          }
        );
      }
    }
    initFrom(): FormGroup{
      return this.fb.group({
        gameName: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
        platform:['',[Validators.required,Validators.minLength(5),Validators.maxLength(40)]],
        releaseDate: ['',[]],
        developer:['',[Validators.minLength(4), Validators.maxLength(40)]],
        genre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
        averageRating:['',[this.rangoNumericoValidator,this.numbersOnlyValidator, Validators.pattern('^[0-9]+$',), Validators.pattern('^[^-]+$')]],
        descriptionGame:['',[Validators.required, Validators.maxLength(450)]]

      })
    }
    numbersOnlyValidator(control: FormControl) {
      const value = control.value;
      if (value && !/^\d+$/.test(value)) {
        return { numbersOnly: true };
      }
      return null;
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
