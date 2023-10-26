import { Component, Input } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { Renderer2 } from '@angular/core';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-videogame',
  templateUrl: './add-videogame.component.html',
  styleUrls: ['./add-videogame.component.css']
})
export class AddVideogameComponent {
  // @Input() game:Game = {} as Game;
  contactForm!: FormGroup;

  constructor(private videoGamesService: VideogamesService,
    private authService: AuthService,
    private renderer: Renderer2,
    private router:Router,
    private fb: FormBuilder) { }


    ngOnInit(): void{
      this.contactForm =  this.initFrom();
    }
    errorResponseMessage = '';
    createGameData() {
      if (this.contactForm.valid) {
        const gameData = this.contactForm.value;

        this.videoGamesService.createGame(gameData).subscribe(
          (response) => {
            console.log('Juego agregado correctamente', response);
            this.closeModalAndReloadPage()
          },
          (error) => {
            console.error('Error al agregar el juego', error);
            this.errorResponseMessage = 'Error al agregar el juego';
          }
        );
      }
    }

    defaultUserImgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIip2Y--IFllD0cow5w64ZrJD-S7oC9pjhc1mELWbqIuk3m2RF';
    initFrom(): FormGroup{
      return this.fb.group({
        gameName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(25),Validators.pattern('[A-Za-z\\s]+')]],
        gameImg: [this.defaultUserImgUrl],
        platform:['',[Validators.required, Validators.maxLength(40),Validators.pattern('[A-Za-z\\s]+')]],
        releaseDate: ['',[Validators.required]],
        developer:['',[Validators.required, Validators.maxLength(40),Validators.pattern('[A-Za-z\\s]+')]],
        genre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(40),Validators.pattern('[A-Za-z\\s]+')]],
        averageRating:['',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]],
        descriptionGame:['',[Validators.required, Validators.maxLength(150),Validators.pattern('[A-Za-z\\s]+')]]

      })
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
}
