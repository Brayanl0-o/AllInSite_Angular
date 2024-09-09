import { Component, Renderer2, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from 'src/app/core/models/game';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';

@Component({
  selector: 'app-edit-videogame',
  templateUrl: './edit-videogame.component.html',
  styleUrls: ['./edit-videogame.component.css']
})
export class EditVideogameComponent {

  constructor(private videoGamesService: VideogamesService,
    private renderer: Renderer2,
    private fb: FormBuilder) {}


  @Input() game: Game = {} as Game;
  contactForm!: FormGroup;
  errorResponseMessageForm = '';
  errorResponseMessage = '';
  isLoading = false;

  ngOnInit(): void{
    this.contactForm = this.initForm();
    this.contactForm.patchValue(this.game);
  }

  onFormSubmit(){
    this.isLoading = true;

    if (this.contactForm.valid) {
      this.isLoading = false;
      this.updateDataGame();
    } else {
      this.errorResponseMessageForm = 'Verifica los campos requeridos con * ';
        setTimeout(() => {
          this.isLoading = false;
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }

  updateDataGame(): void {
    this.isLoading = true;

   if(!this.game){
    console.error('Error: No se proporcionaron datos para la actualización.');
    this.isLoading = false;
    return;
   }

   this.game = { ...this.game, ...this.contactForm.value};

   this.videoGamesService.updateGame(this.game._id, this.game).subscribe(
    (response) =>{
      this.game = response;
      // this.closeModal();
      this.closeModalAndReloadPage();
    },
    (error) => {
      console.error('Error al actualizar los datos:', error);
    }
    )
  }

  initForm(): FormGroup{
    return this.fb.group({
      gameName: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
      gameImg: [this.game.gameImg],
      platform:['',[Validators.required,Validators.minLength(2),Validators.maxLength(40), Validators.pattern('^[^-]+$')]],
      releaseDate: ['',[Validators.required]],
      developer:['',[Validators.minLength(4), Validators.maxLength(40), Validators.pattern('^[^-]+$')]],
      genre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      averageRating:['',[this.rangoNumericoValidator, Validators.pattern('^[0-9]+$',), Validators.pattern('^[^-]+$')]],
      descriptionGame:['',[Validators.required, Validators.maxLength(1050)]],
      gameTrailer:['',[ Validators.maxLength(450)]],
      linkToFree:['',[ Validators.maxLength(450)]],
      linkToBuy:['',[ Validators.maxLength(450)]]
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
    this.renderer.removeStyle(document.body, 'overflow');
    this.videoGamesService.$modal.emit(false)
  }
}

