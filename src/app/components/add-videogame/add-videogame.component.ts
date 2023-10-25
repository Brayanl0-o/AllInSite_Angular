import { Component, Input } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { Renderer2 } from '@angular/core';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    defaultUserImgUrl = 'https://p1.hiclipart.com/preview/403/536/937/internet-logo-user-user-profile-symbol-wifi-user-account-computer-avatar-png-clipart.jpg';
    initFrom(): FormGroup{
      return this.fb.group({
        gameName: ['',[Validators.required]],
        gameImg: [this.defaultUserImgUrl],
        platform:['',Validators.required],
        releaseDate: ['',Validators.required],
        developer:['',Validators.required],
        genre:['',Validators.required],
        averageRating:['',Validators.required]

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
