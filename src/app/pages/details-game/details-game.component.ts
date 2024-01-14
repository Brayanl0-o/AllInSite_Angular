import { Component, Input, Renderer2} from '@angular/core';
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

  constructor(private videogamesService: VideogamesService,
    private authService: AuthService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router) {
    this.gameDetails$ = new Observable<Game>();
  }

  // @Input() game: Game = {} as Game;
  gameDetails$: Observable<Game>;
  // gameId: string | null = null;
  gameId!: ''
  gameImgUrl: string | null = null;
  gameImg = '';
  userId = '';
  isEditingImg = false;
  selectedFile : File | null = null;


  ngOnInit() {
    this.videogamesService.$modal.subscribe((valu) => { this.isModalVisible =valu })
    this.gameDetails$ = this.videogamesService.getGameById(this.userId, this.gameId);
    this.imageUrl = `${apiUrl}uploads/videogames/`
    this.loadDataGame();
    this.isAdminOrNot();
  }

  onFileSelectedGame(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
      const file = inputElement?.files?.[0];
      if (file){
        this.selectedFile = file;
      }
  }
  updatedGameImg(gameImg: File): void {
    // console.log('Select file', this.selectedFile);

    // Suscríbete a gameDetails$
    this.gameDetails$.subscribe((game: Game) => {
      if (!game) {
        console.error('Error: No hay datos de actualización');
        return;
      }
      // console.log('game id', game._id);
      this.videogamesService.updatedGameImg(game._id, gameImg).subscribe(
        (response) => {
          // Actualiza el gameDetails$ si es necesario
          this.gameDetails$ = this.videogamesService.getGameById(this.userId, this.gameId);
          // console.log('Datos act con exito:', response);
          this.loadDataGame()
        },
        (error) => {
          console.error('Error al updated', error);
        }
      );
    });

    this.isEditingImg = false;
  }

  newGameImg = '';
  cancelEditImg(){
    this.newGameImg = this.gameImg;
    this.isEditingImg = false;
    this.renderer.removeStyle(document.body, 'overflow');

  }

  openModalImg(){
      this.isEditingImg = true;
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  isAdmin: boolean = false;
  isAdminOrNot(){
    const logginRoles = this.authService.getLoggedUserRole();
    const allowedRole = 'administrador';
    this.isAdmin = logginRoles.includes(allowedRole)
  }

  isModalVisible!: boolean;
  openModal() {
    this.isModalVisible = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
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

  isLoading: boolean = true;
  loadDataGame() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const userId = params.get('userId');
      const gameId = params.get('gameId');

      if (gameId) {

        if (userId) {
          this.gameDetails$ = this.videogamesService.getGameById(userId, gameId as string);
          this.gameDetails$.subscribe((game) => {
          // console.log('Valor de game:', game);
          this.gameImgUrl = game.gameImg;
          this.isLoading = false;
          // if (game && game.gameImg) {
          //   this.gameImgUrl = game.gameImg;
          //   this.isLoading = false;

          // } else {
          //   console.error('Game o gameImg son nulos o indefinidos.');
          //   this.gameImgUrl = '';
          // }
        });
        } else {
          this.gameDetails$ = this.videogamesService.getGameById('', gameId as string);
          // Asigna la URL de la imagen del juego directamente desde los detalles del juego
          this.gameDetails$.subscribe((game) => {
            if (game && game.gameImg) {
              this.gameImgUrl = game.gameImg;
              this.isLoading = false;

            } else {
              console.error('Game o gameImg son nulos o indefinidos.');
              this.gameImgUrl = '';
            }
          });
        }
      }
    });
  }
}
