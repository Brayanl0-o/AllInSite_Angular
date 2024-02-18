import { Component,Renderer2} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';

@Component({
  selector: 'app-add-videogame',
  templateUrl: './add-videogame.component.html',
  styleUrls: ['./add-videogame.component.css']
})
export class AddVideogameComponent {
  constructor(private videoGamesService: VideogamesService,
    private renderer: Renderer2,
    private fb: FormBuilder) { }


  contactForm!: FormGroup;
  selectedFile: File | null = null;
  errorResponseMessageForm = '';
  errorResponseMessage = '';

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

  onFormSubmit(){
    if (this.contactForm.valid) {
      this.createGameData();
    } else {
      this.errorResponseMessageForm = 'Verifique el formulario!';
        setTimeout(() => {
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }

  createGameData() {
    if (this.selectedFile && this.contactForm.valid) {
      const gameData = this.contactForm.value;

      const formData = new FormData();
      formData.append('gameName', gameData.gameName);
      formData.append('platform', gameData.platform);
      formData.append('releaseDate', gameData.releaseDate);
      formData.append('developer', gameData.developer);
      formData.append('genre', gameData.genre);
      formData.append('averageRating', gameData.averageRating);
      formData.append('descriptionGame', gameData.descriptionGame);
      formData.append('gameTrailer', gameData.gameTrailer);

      formData.append('gameImg', this.selectedFile);

      this.videoGamesService.createGame(gameData, this.selectedFile).subscribe(
        (response) => {
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
      platform:['',[Validators.required,Validators.minLength(2),Validators.maxLength(40)]],
      releaseDate: ['',[Validators.required]],
      developer:['',[Validators.minLength(4), Validators.maxLength(40)]],
      genre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      averageRating:['',[Validators.required,this.rangoNumericoValidator,this.numbersOnlyValidator, Validators.pattern('^[0-9]+$',), Validators.pattern('^[^-]+$')]],
      descriptionGame:['',[Validators.required, Validators.maxLength(450)]],
      gameTrailer:['',[ Validators.maxLength(450)]]
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
    this.renderer.removeStyle(document.body, 'overflow');
    this.videoGamesService.$modal.emit(false)
  }
}
