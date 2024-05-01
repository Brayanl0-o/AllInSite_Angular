import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GameRequirements } from 'src/app/core/models/game';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';

@Component({
  selector: 'app-add-requirements',
  templateUrl: './add-requirements.component.html',
  styleUrls: ['./add-requirements.component.css']
})
export class AddRequirementsComponent {
  gameRequirements: GameRequirements | null = null;
  contactForm!: FormGroup;
  errorResponseMessageForm = '';
  errorResponseMessage = '';
  isLoading = false;
  gameId = '';

  constructor(private videoGamesService: VideogamesService,
    private route: ActivatedRoute,
    private fb: FormBuilder)
    {}

  ngOnInit():void{
    this.contactForm = this.initFrom();
    this.route.paramMap.subscribe(paramMap => {
      this.gameId = paramMap.get('gameId') ?? '';
    });
  }

    onFormSubmit(){
      this.updateGameRequeriments();
    }

    updateGameRequeriments(){
      this.isLoading = true;

      if(this.contactForm.valid){
        const { ramValue, ramUnit, sizeValue, sizeUnit, ...rest } = this.contactForm.value;
        const sizeGame = { value: sizeValue, unit: sizeUnit};
        const ramGame = { value: ramValue, unit: ramUnit};

        const gameRequirements = { ...rest, sizeGame, ramGame, gameId: this.gameId };
        // const gameRequirements: GameRequirements = { ...this.contactForm.value, gameId: this.gameId };
        this.videoGamesService.updateRequirements(gameRequirements).subscribe(
          (response) => {
            console.log(response)
            this.isLoading = false;
            window.location.reload();
          },
          (error) => {
            this.isLoading = false;
            console.error('Error al actualizar los datos:', error);
          }
        )
      } else {
        setTimeout(() => {
          this.isLoading = false;
          this.errorResponseMessage = '';
          console.error('Error al enviar el formulario de requisitos ', this.errorResponseMessage);
        }, 1000);
      }
    }

    initFrom(): FormGroup{
      return this.fb.group({
        platform: ['',[ Validators.maxLength(60)]],
        sizeValue: ['', [Validators.maxLength(4), this.numbersOnlyValidator]],
        sizeUnit: ['KB'],
        ramValue: ['', [Validators.maxLength(3), this.numbersOnlyValidator]],
        ramUnit: ['MB'],
        processorGame: ['',[ Validators.maxLength(200)]],
        graphGame: ['',[ Validators.maxLength(200)]],

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
