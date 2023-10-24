import { Component, Input } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { Renderer2 } from '@angular/core';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';
@Component({
  selector: 'app-add-videogame',
  templateUrl: './add-videogame.component.html',
  styleUrls: ['./add-videogame.component.css']
})
export class AddVideogameComponent {
  @Input() game:Game = {} as Game;
  // contactForm!: FormGroup;

  constructor(private videoGamesService: VideogamesService,
    private renderer: Renderer2) { }


    ngOnInit(): void{

    }

    addGameData(): void {
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
