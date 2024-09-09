import { Component, Renderer2} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';
import { Game } from 'src/app/core/models/game';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { timer } from 'rxjs';
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

    this.gameDetails$ = this.route.params.pipe(
      switchMap(params => this.videogamesService.getGameByIdMedium(params['gameId']))
    )
    this.gameDetails$.subscribe(game => {
      this.safeGameTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(game.gameTrailer);
    });
    this.gameDetails$ = this.route.params.pipe(
      map(params => params['gameId']),
    );
  }

  stars: {type:'full'| 'medium' | 'empty'} [] = [];
  selectedFile : File | null = null;
  gameImgUrl: string | null = null;
  isLoadingScreen = true;
  detailsLoaded = false;
  isEditingImg = false;
  isLoading = false;
  imageUrl!: string;
  gameImg = '';
  userId = '';
  gameId = '';
  gameDetails$: Observable<Game>;
  safeGameTrailerUrl!: SafeResourceUrl;

  ngOnInit() {
    this.videogamesService.$modal.subscribe((valu) => { this.isModalVisible =valu })
    this.route.paramMap.subscribe(paramMap => {
      this.gameId = paramMap.get('gameId') ?? '';
    });
    this.imageUrl = `${apiUrl}uploads/videogames/medium/`
    this.loadDataGame();
    this.isAdminOrNot();
    this.calcStars();
  }
  loadDataGame() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const userId = params.get('userId');
      const gameId = params.get('gameId');
      this.renderer.setStyle(document.body, 'overflow', 'hidden');

      if (gameId) {
        if (userId) {
          this.gameDetails$ = this.videogamesService.getGameByIdMedium( gameId as string);
          this.gameDetails$.subscribe((game) => {
          this.gameImgUrl = game.gameImg;
            if(game && game.gameImg){
              this.gameImgUrl = game.gameImg;
              this.detailsLoaded = !this.detailsLoaded;
              timer(1500).subscribe(() => {
                this.isLoadingScreen = false;
                this.renderer.removeStyle(document.body, 'overflow');
              });
            }else{
              console.error('Game o gameImg son nulos o indefinidos.');
              this.gameImgUrl = '';
            }
        });
        } else {
          this.gameDetails$ = this.videogamesService.getGameByIdMedium(gameId as string);
          // Asigna la URL de la imagen del juego directamente desde los detalles del juego
          this.gameDetails$.subscribe((game) => {
            if (game && game.gameImg) {
              this.gameImgUrl = game.gameImg;
              this.detailsLoaded = !this.detailsLoaded;
              timer(1500).subscribe(() => {
                this.isLoadingScreen = false;
                this.renderer.removeStyle(document.body, 'overflow');
              });
            } else {
              console.error('Game o gameImg son nulos o indefinidos.');
              this.gameImgUrl = '';
            }
          });
        }
      }
    });
  }

  calcStars(){
    this.gameDetails$.subscribe(game => {
      const rating = game.averageRating;
      // const maxRating = 10;
      const numberOfStars = 5;

      const fullStars = Math.floor(rating / 2); // Calcular cuántas estrellas llenas
      const hasHalfStar = rating % 2 !== 0; // Verificar si hay una estrella media

      this.stars = Array.from({ length: numberOfStars }, (_, index) => ({
        type: index < fullStars ? 'full' : (hasHalfStar && index === fullStars ? 'medium' : 'empty'),
      }));
    })
  }

  onFileSelectedGame(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
      const file = inputElement?.files?.[0];
      if (file){
        this.selectedFile = file;
      }
  }
  updatedGameImg(gameImg: File): void {
    this.isLoading = true;
    this.gameDetails$.subscribe((game: Game) => {
      if (!game) {
        this.isLoading = false;
        console.error('Error: No hay datos de actualización');
        return;
      }
      this.videogamesService.updatedGameImg(game._id, gameImg).subscribe(
        (response) => {
          this.gameDetails$ = this.videogamesService.getGameByIdMedium( this.gameId);
          this.isLoading = false;

          this.closeModalAndReloadPage();
          this.loadDataGame();
        },
        (error) => {
          this.isLoading = false;
          console.error('Error al updated', error);
        }
      );
    });
  }

  openLinkToBuy(){
    this.gameDetails$.subscribe((game:Game) => {
      const linkToBuy = game.linkToBuy;
      if(linkToBuy){
        window.open(linkToBuy, '_blank')
      }
    })
  }
  openLinkToFree(){
    this.gameDetails$.subscribe((game:Game) => {
      const linkToFree = game.linkToFree;
      if(linkToFree){
        window.open(linkToFree, '_blank')
      }
    })
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

  backVideogames() {
    const userId = this.authService.getLoggedInUserId();
    if (userId) {
      this.navigateToVideogames(userId);
    } else {
      this.navigateToVideogames();
    }
  }
}
