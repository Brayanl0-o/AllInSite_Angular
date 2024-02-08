import { Component, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GameRequirements } from 'src/app/models/game';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';

@Component({
  selector: 'app-add-requirements',
  templateUrl: './add-requirements.component.html',
  styleUrls: ['./add-requirements.component.css']
})
export class AddRequirementsComponent {
  constructor(private videoGamesService: VideogamesService,
    private renderer: Renderer2,
    private fb: FormBuilder){
      this.errorResponseMessage = '';

    }

    contactForm!: FormGroup;
    errorResponseMessageForm = '';
    errorResponseMessage = '';

    gameId = '';
    ngOnInit():void{
      this.contactForm = this.initFrom();
    }
    onFormSubmit(){
      this.updateGameRequeriments();
    }
    updateGameRequeriments(){
      if(this.contactForm.valid){

        const gameRequeriments: GameRequirements = this.contactForm.value;
        this.videoGamesService.updateRequirements( gameRequeriments).subscribe(
          (response) => {
            this.reloadPage()
          },
          (error) => {
            console.error('Error al actualizar los datos:', error);
          }
        )
      } else {
      setTimeout(() => {
        this.errorResponseMessage = '';
        console.error('Error al enviar el formulario de requisitos ', this.errorResponseMessage);
      }, 1000);
      }
    }

    initFrom(): FormGroup{
      return this.fb.group({
        platform: ['',[Validators.minLength(0), Validators.maxLength(60)]],
        sizeGame: ['', [ this.numbersOnlyValidator]],
        ramGame: ['',[ Validators.maxLength(3), this.numbersOnlyValidator]],
        processorGame: ['',[Validators.minLength(0), Validators.maxLength(200)]],
        graphGame: ['',[Validators.minLength(0), Validators.maxLength(200)]],

      })
    }
    numbersOnlyValidator(control: FormControl) {
      const value = control.value;
      if (value && !/^\d+$/.test(value)) {
        return { numbersOnly: true };
      }
      return null;
    }
    reloadPage() {
      window.location.reload();
    }
}
