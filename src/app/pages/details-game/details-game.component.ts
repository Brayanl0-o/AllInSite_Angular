import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { Game } from 'src/app/models/game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent {
  gameDetails$: Observable<Game>;
  gameId: string | null = null;
  gameImgUrl: string | null = null;
  constructor(private videogameService: VideogamesService, private route: ActivatedRoute) {
    this.gameDetails$ = new Observable<Game>();
  }

  ngOnInit() {
    this.loadDataGame();
  }

  loadDataGame() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const userId = params.get('userId');
      const gameId = params.get('gameId');
      if (gameId) {
        console.log('game id:', gameId);

        if (userId) {
          this.gameDetails$ = this.videogameService.getGameById(userId, gameId as string);
         // Asigna la URL de la imagen del juego directamente desde los detalles del juego
         this.gameDetails$.subscribe((game) => {
          this.gameImgUrl = game.gameImg; // Asumiendo que la URL de la imagen se encuentra en el objeto Game
        });
        } else {
          this.gameDetails$ = this.videogameService.getGameById('', gameId as string);
          // Asigna la URL de la imagen del juego directamente desde los detalles del juego
          this.gameDetails$.subscribe((game) => {
            this.gameImgUrl = game.gameImg; // Asumiendo que la URL de la imagen se encuentra en el objeto Game
          });
        }
      }
    });
  }
}
