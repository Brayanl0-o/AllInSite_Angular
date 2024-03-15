import { Component, Input, Renderer2, ChangeDetectorRef } from '@angular/core';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';
import { FilterService } from 'src/app/core/services/filter/filter.service';
import { SharedUsersService } from 'src/app/core/services/sharedUsers/shared-users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/core/models/game';
import { User } from 'src/app/core/models/user';
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
    private router:Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.videogamesService.$modal.subscribe((valu) => { this.isModalVisible =valu })
    this.dataUser()
    this.loadGameData();
    this.subscribeFilter();
    this.IsAdminOrUser();
    this.applyFilters({});
  }

  isAdmin: boolean = false;
  IsAdminOrUser(){
    const getRoleUser = this.authService.getLoggedUserRole();
    const allowedRole = 'administrador'

    if(getRoleUser == allowedRole){
      this.isAdmin = true;
    } else{
      this.isAdmin = false;
      // console.warn('El usuario no tiene el rol de administrador algunas funciones no se mostraran');
    }
  }

  isModalVisible!: boolean;
  openModal() {
    this.isModalVisible = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  dataUser(){
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (loggedInUserId) {
      this.userId = loggedInUserId;
      this.route.paramMap.subscribe(paramMap => {
          const id = paramMap.get('id');

          if (id === loggedInUserId) {
            this.userShared.getUser(id).subscribe(data => {
              this.user = data;
            });
          } else {
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
    });
  }

  notResultsOne: boolean = false;
  searchTerm: string = '';
  searchGames() {
    // Filter the games fot search word
    const results = this.filteredGames = this.games.filter((game) =>
      game.gameName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Validate result's number
    if(results.length === 0){
      this.notResultsOne = true;
    }else{
      this.filteredGames = results;
      this.notResultsOne = false;
      this.page = 1;
    }
  }

  onSearchValueChanged(searchTerm: string) {
    this.searchTerm = searchTerm; // upload search Term
    this.searchGames(); // Calling to the function 'searchTerm'
  }

  showPopover = false;
  showPopoverMouseEnter(game: any) {
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

  notResultsTwo: boolean = false
  applyFilters(filters: any) {
    // Aplica los filtros de plataforma, género y desarrollador
  if (filters && filters.platforms && filters.genres && filters.developers) {
    const filteredGames = this.games.filter((game) => {
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
          return true;
        } else {
          return false;
        }
      }
      return true;
    });

    if (filters.order === 'asc') {
      filteredGames.sort((a, b) => a.averageRating - b.averageRating);
    } else if (filters.order === 'desc') {
      filteredGames.sort((a, b) => b.averageRating - a.averageRating);
    }
    // Actualiza la lista filtrada
    this.filteredGames = filteredGames;

    // Actualiza la bandera de noResults solo si no hay resultados y se han aplicado filtros
    this.notResultsTwo = filters.platforms.length > 0 || filters.genres.length > 0 || filters.developers.length > 0
    ? filteredGames.length === 0
    : false;
    this.cdr.detectChanges();
    this.page = 1;

    // if(this.filteredGames .length == 0){
    //   console.log('filtred games es igual a:(inside)',this.filteredGames .length)
    //   this.notResults = false;

    // }else{
    //   this.notResults = true;
    //   this.filteredGames = [...this.filteredGames ];
    //   this.page = 1;

    // }

    }
  }
}
