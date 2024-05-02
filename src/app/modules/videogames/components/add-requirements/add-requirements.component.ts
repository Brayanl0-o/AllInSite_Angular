import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-add-requirements',
  templateUrl: './add-requirements.component.html',
  styleUrls: ['./add-requirements.component.css']
})
export class AddRequirementsComponent {
  @Input() gameRequeriments: Game = {} as Game;
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
    this.route.paramMap.subscribe(paramMap => {
      this.gameId = paramMap.get('gameId') ?? '';
      this.contactForm = this.initForm();
      this.contactForm.patchValue(this.gameRequeriments);
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
        this.videoGamesService.updateRequirements(gameRequirements).subscribe(
          (response) => {
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

    initForm(): FormGroup{
      return this.contactForm = this.fb.group({
        platform: [this.gameRequeriments.platform ?? '', [Validators.maxLength(60)]],
        sizeValue: [this.gameRequeriments.requirements.sizeGame?.value ?? '', [Validators.maxLength(5), this.numbersOnlyValidator]],
        sizeUnit: [this.gameRequeriments.requirements.sizeGame?.unit ?? 'KB', []], // Aquí debes agregar validadores según tus necesidades
        ramValue: [this.gameRequeriments.requirements.ramGame?.value ?? '', [Validators.maxLength(3), this.numbersOnlyValidator]],
        ramUnit: [this.gameRequeriments.requirements.ramGame?.unit ?? 'MB', []], // Aquí debes agregar validadores según tus necesidades
        processorGame: [this.gameRequeriments.requirements.processorGame ?? '', [Validators.maxLength(200)]],
        graphGame: [this.gameRequeriments.requirements.graphGame ?? '', [Validators.maxLength(200)]],
      });
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
