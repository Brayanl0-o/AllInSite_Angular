import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { Game } from 'src/app/models/game';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
const apiUrl = environment.apiUrl
@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent {
  gameDetails$: Observable<Game>;
  gameId: string | null = null;
  gameImgUrl: string | null = null;
  constructor(private videogameService: VideogamesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.gameDetails$ = new Observable<Game>();
  }

  navigateToVideogames(userId?: string | null) {
    const route = userId ? `/videogames;id=${userId}` : '/videogames';
    this.router.navigateByUrl(route);
  }
  imageUrl!: string;
  backVideogames() {
    const userId = this.authService.getLoggedInUserId();
    if (userId) {
      this.navigateToVideogames(userId);
    } else {
      this.navigateToVideogames();
    }
  }

  ngOnInit() {
    this.imageUrl = `${apiUrl}uploads/videogames/`
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
         this.gameDetails$.subscribe((game) => {
          // console.log('Valor de game:', game);
          if (game && game.gameImg) {
            this.gameImgUrl = game.gameImg;
            console.log('Valor de gameImgUrl:', this.gameImgUrl);
          } else {
            console.error('Game o gameImg son nulos o indefinidos.');
            this.gameImgUrl = '';
          }
        });
        } else {
          this.gameDetails$ = this.videogameService.getGameById('', gameId as string);
          // Asigna la URL de la imagen del juego directamente desde los detalles del juego
          this.gameDetails$.subscribe((game) => {
            if (game && game.gameImg) {
              this.gameImgUrl = game.gameImg;
              // console.log('Valor de gameImgUrl:', this.gameImgUrl);
            } else {
              console.error('Game o gameImg son nulos o indefinidos.');
              this.gameImgUrl = '';
            }// Asumiendo que la URL de la imagen se encuentra en el objeto Game
          });
        }
      }
    });
  }
}
