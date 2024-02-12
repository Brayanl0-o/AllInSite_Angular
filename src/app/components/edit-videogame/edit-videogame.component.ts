import { Component, Renderer2, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';

@Component({
  selector: 'app-edit-videogame',
  templateUrl: './edit-videogame.component.html',
  styleUrls: ['./edit-videogame.component.css']
})
export class EditVideogameComponent {

  constructor(private videoGamesService: VideogamesService,
    private renderer: Renderer2,
    private fb: FormBuilder) { }


    @Input() game: Game = {} as Game;
    contactForm!: FormGroup;
    errorResponseMessageForm = '';
    errorResponseMessage = '';


    ngOnInit(): void{
      this.contactForm = this.initFrom();
      this.contactForm.patchValue(this.game);
    }

  onFormSubmit(){
    if (this.contactForm.valid) {
      this.updateDataGame();
    } else {
      this.errorResponseMessageForm = 'Verifica los campos requeridos con * ';
        setTimeout(() => {
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }

  updateDataGame(): void {
   if(!this.game){
    console.error('Error: No se proporcionaron datos para la actualización.');
    return;
   }

   this.game = { ...this.game, ...this.contactForm.value};

   this.videoGamesService.updateGame(this.game._id, this.game).subscribe(
    (response) =>{
      this.closeModalAndReloadPage();
      // console.log('Datos act con exito:', response);
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
      // platform:['',[Validators.required,Validators.minLength(5),Validators.maxLength(40)]],
      releaseDate: ['',[Validators.required]],
      developer:['',[Validators.minLength(4), Validators.maxLength(40)]],
      genre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      averageRating:['',[Validators.required,this.rangoNumericoValidator, Validators.pattern('^[0-9]+$',), Validators.pattern('^[^-]+$')]],
      descriptionGame:['',[Validators.required, Validators.maxLength(450)]],
      gameTrailer:['',[ Validators.maxLength(450)]]

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

