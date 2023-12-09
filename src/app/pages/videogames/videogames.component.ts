import { Component, Input, Renderer2 } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { User } from 'src/app/models/user';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType}  from '@angular/common/http';
import { environment } from 'src/environments/environment';
const apiBaseUrl= environment.apiUrl;

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.css']
})
export class VideogamesComponent {
  @Input()user:User | null = null;
  userId: string| null= null;
  games: Game[] = [];
  filteredGames: Game[] = [];
  loadingData: boolean = true;
  imageUrl!: string;
  page: number = 1;

  constructor(
    private http: HttpClient,
    private videogamesService: VideogamesService,
    private filterService: FilterService,
    private userShared: SharedUsersService,
    private authService: AuthService,
    private route:ActivatedRoute,
    private renderer: Renderer2,
    private router:Router
  ) {}

  ngOnInit(): void {

    this.videogamesService.$modal.subscribe((valu) => { this.isModalVisible =valu })
    this.dataUser()
    this.loadGameData();
    this.subscribeFilter()
  }

  isModalVisible!: boolean;
  openModal() {
    this.isModalVisible = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  isUserLoggedIn(){
    return this.authService.loggedIn()
  }

  dataUser(){
    // Obtiene el ID del usuario logueado desde el servicio de autenticación
    const loggedInUserId = this.authService.getLoggedInUserId();
    // console.log('loggedInUserId:', loggedInUserId);

    if (loggedInUserId) {
      this.userId = loggedInUserId;
      this.route.paramMap.subscribe(paramMap => {
          const id = paramMap.get('id');
          // console.log('Id Login: ', id)

          if (id === loggedInUserId) {
            this.userShared.getUser(id).subscribe(data => {
              this.user = data;
              // console.log('Data User prfile', data)
            });
          } else {
            console.error('Error ids diferentes no coinciden')
            // this.router.navigate(['/error']);
          }
        });
      }
  }
  navigateToVideogames(userId: string | null) {
    const route = userId ? `/videogames;id=${userId}` : '/videogames';
    this.router.navigateByUrl(route);
  }

  deleteGame(gameId: string) {

    this.videogamesService.deleteGame(gameId).subscribe(
      (response) => {
        this.filteredGames = this.filteredGames.filter(game => game._id !== gameId);
        console.log('Game eliminada exitosamente', response);
      //  window.location.reload();
      this.navigateToVideogames(this.userId);
      },
      (error) => {
        console.error('Error al eliminar game', error);
      }
    );
  }

  private loadGameData() {
    this.videogamesService.getGame().subscribe((data: Game[]) => {
      this.imageUrl = `${apiBaseUrl}uploads/videogames/`;
      this.games = data;
      this.loadingData = false;
      this.filteredGames = [...this.games];
      // console.log('dataload',data);
    });
  }

  searchTerm: string = '';
  searchGames() {
    // Filtra los juegos en función del término de búsqueda
    this.filteredGames = this.games.filter((game) =>
      game.gameName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchValueChanged(searchTerm: string) {
    this.searchTerm = searchTerm; // Actualiza el término de búsqueda
    this.searchGames(); // Llama a la función de búsqueda
  }

  showPopover = false;
  showPopoverMouseEnter(game:any) {
   game.showPopover = true;
  }

  hidePopoverMouseLeave(game:any) {
    game.showPopover = false;
  }

  subscribeFilter(){
    this.filterService.filters$.subscribe((filters) => {
      // console.log('Filters received in HomeComponent:', filters);
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: any) {
    // Aplica los filtros de plataforma, género y desarrollador
    this.filteredGames = this.games.filter((game) => {
      if (filters.platforms.length > 0) {
        const hasSelectedPlatform = filters.platforms.some((platform: string) =>
          game.platform.toLowerCase().includes(platform.toLowerCase())
        );
        if (!hasSelectedPlatform) {
          return false;
        }
      }

      if (filters.genres.length > 0) {
        const hasSelectedGenre = filters.genres.some((genre: string) =>
          game.genre.toLowerCase().includes(genre.toLowerCase())
        );
        if (!hasSelectedGenre) {
          return false;
        }
      }

      if (filters.developers.length > 0) {
        const hasSelectedDeveloper = filters.developers.some((developer: string) =>
          game.developer.toLowerCase().includes(developer.toLowerCase())
        );
        if (!hasSelectedDeveloper) {
          return false;
        }
      }
      // Verifica la fecha de lanzamiento
      if (filters.startDate && filters.endDate) {
        const gameDate = new Date(game.releaseDate);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        // Comprueba si la fecha de lanzamiento del juego está dentro del rango seleccionado
        if (gameDate >= startDate && gameDate <= endDate) {
          return true; // Incluye el juego si cumple con el rango de fechas
        } else {
          return false; // Excluye el juego si no cumple con el rango de fechas
        }
      }
      return true;
    });
    // console.log('Order:', filters.order);
    if (filters.order === 'asc') {
      this.filteredGames.sort((a, b) => a.averageRating - b.averageRating);
    } else if (filters.order === 'desc') {
      this.filteredGames.sort((a, b) => b.averageRating - a.averageRating);
    }
  }

}
