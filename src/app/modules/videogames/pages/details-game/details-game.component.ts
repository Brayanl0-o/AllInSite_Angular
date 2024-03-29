import { Component, Input, Renderer2} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';
import { Game, GameRequirements } from 'src/app/core/models/game';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    private router: Router,
    private sanitizer: DomSanitizer) {
    this.gameDetails$ = new Observable<Game>();
    this.gameRequirements$ = new Observable<GameRequirements>();
    this.gameDetails$ = this.route.params.pipe(
      map(params => params['gameId']),
      switchMap(gameId => this.videogamesService.getGameById(gameId))
    );

    this.gameDetails$.subscribe(game => {
      this.safeGameTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(game.gameTrailer);
    });
  }

  safeGameTrailerUrl!: SafeResourceUrl;

  gameDetails$: Observable<Game>;
  gameRequirements$: Observable<GameRequirements>
  gameId: string = '';
  gameImgUrl: string | null = null;
  gameImg = '';
  userId = '';
  isEditingImg = false;
  selectedFile : File | null = null;

  ngOnInit() {
    // this.safeGameTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.gameDetails$.gameTrailer)
    this.videogamesService.$modal.subscribe((valu) => { this.isModalVisible =valu })
    this.route.paramMap.subscribe(paramMap => {
      this.gameId = paramMap.get('gameId') ?? '';
    });
    this.imageUrl = `${apiUrl}uploads/videogames/`
    this.loadDataGame();
    this.loadGameRequirements(this.gameId);
    this.isAdminOrNot();
  }

  loadGameRequirements(gameId: string): void {
    if (gameId) {
      this.videogamesService.getRequirementesById(gameId).subscribe(
        (gameRequirements) => {
          if (gameRequirements !== null) {
            // console.log('Requerimientos del juego:', gameRequirements);
            this.gameRequirements$ = of(gameRequirements);
          } else {
            // console.error('El juego no tiene requerimientos.');
            this.gameRequirements$ = of({} as GameRequirements);
          }
        },
        (error) => {
          console.error('Error al obtener los requerimientos del juego:', error);
        }
      );
    } else {
      console.error('No se proporcionó un ID de juego.');
    }
  }

  onFileSelectedGame(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
      const file = inputElement?.files?.[0];
      if (file){
        this.selectedFile = file;
      }
  }

  updatedGameImg(gameImg: File): void {
    // Suscríbete a gameDetails$
    this.gameDetails$.subscribe((game: Game) => {
      if (!game) {
        console.error('Error: No hay datos de actualización');
        return;
      }
      this.videogamesService.updatedGameImg(game._id, gameImg).subscribe(
        (response) => {
          this.gameDetails$ = this.videogamesService.getGameById( this.gameId);
          this.closeModalAndReloadPage();
          this.loadDataGame();
        },
        (error) => {
          console.error('Error al updated', error);
        }
      );
    });
    this.isEditingImg = false;
  }
  closeModalAndReloadPage() {
    this.closeModal();
    window.location.reload();
  }
  closeModal() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.videogamesService.$modal.emit(false)
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

  isModalVisibleRequiriments: boolean = false;
  openModalRequirements() {
    this.isModalVisibleRequiriments = !this.isModalVisibleRequiriments;
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
          this.gameDetails$ = this.videogamesService.getGameById( gameId as string);
          this.gameDetails$.subscribe((game) => {
          // console.log('Valor de game:', game);
          this.gameImgUrl = game.gameImg;
          this.isLoading = !this.isLoading;
        });
        } else {
          this.gameDetails$ = this.videogamesService.getGameById(gameId as string);
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
