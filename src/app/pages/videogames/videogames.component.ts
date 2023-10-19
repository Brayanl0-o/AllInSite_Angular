import { Component, Input } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.css']
})
export class VideogamesComponent {
  games: Game[] = [];
  filteredGames: Game[] = [];

  currentPage = 1; // Página actual
  pageSize = 9;  // Juegos por página
  totalGames = 13;// Total de juegos (necesario para la paginación)
  totalPages: number = 2;
  pages!:  number[];

  loadingData: boolean = true;

  constructor(
    private videogamesService: VideogamesService,
    private filterService: FilterService,
    private userShared: SharedUsersService,
      private authService: AuthService,
      private route:ActivatedRoute
  ) {}

  isUserLoggedIn(){
    return this.authService.loggedIn()
  }

  @Input()user:User | null = null;
  userId: string| null= null;
  dataUser(){
    // Obtiene el ID del usuario logueado desde el servicio de autenticación
    const loggedInUserId = this.authService.getLoggedInUserId();
    console.log('loggedInUserId:', loggedInUserId);

    if (loggedInUserId) {
      // Asignar el userId obtenido al userId del componente
      this.userId = loggedInUserId;
      this.route.paramMap.subscribe(paramMap => {

        // Obtiene el ID de usuario de la URL
          const id = paramMap.get('id');
          console.log('Id Login: ', id)

          // Comprueba si el ID de usuario de la URL coincide con el usuario logueado
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


  ngOnInit(): void {
    this.loadGameData(this.currentPage, this.pageSize);
    // console.log('loadGameDatareceived in HomeComponent:', this.loadGameData);
    this.dataUser()
    this.pagination()

    this.subscribeFilter()
  }


  private loadGameData(page: number, pageSize: number) {
    // console.log('Loading game data for page', page);
    this.videogamesService.getGame(page, pageSize).subscribe((response: any) => {
      //  console.log('Game data response:', response);
      this.loadingData = false;
      this.games = response.games; // Asigna la matriz de juegos desde la respuesta de la API
      this.totalGames = response.totalGames; // Actualiza el total de juegos
      this.currentPage = response.currentPage; // Actualiza la página actual
      this.filteredGames = [...this.games];
      // console.log('dataload', response.games);
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

  pagination(){
    this.currentPage = 1; // Establece la página inicial
    this.pageSize = 9; // Establece el tamaño de página deseado

    // Obtener el número total de juegos desde tu servicio o donde sea que lo obtengas
    this.videogamesService.getGame(this.currentPage, this.pageSize).subscribe((response: any) => {
      this.games = response.games;
      this.totalGames = response.totalGames;

      // Verifica si totalGames y pageSize son valores válidos antes de calcular totalPages
      if (this.totalGames && this.pageSize) {
        // Calcular totalPages
        this.totalPages = Math.ceil(this.totalGames / this.pageSize);
      }
      if(this.totalPages !== undefined){
        // Crea un array de números de página desde 1 hasta totalPages
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        // console.log('currentPage', this.currentPage,'totalPages', this.totalPages,'pages', this.pages);
      }
    });
  }

  // Función para cambiar de página
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadGameData(page, this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGameData(this.currentPage, this.pageSize);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadGameData(this.currentPage, this.pageSize);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadGameData(this.currentPage, this.pageSize);
    }
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
        const gameDate = new Date(game.releaseDate); // Suponiendo que la fecha de lanzamiento está en el formato adecuado
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);

        // Comprueba si la fecha de lanzamiento del juego está dentro del rango seleccionado
        if (gameDate >= startDate && gameDate <= endDate) {
          return true; // Incluye el juego si cumple con el rango de fechas
        } else {
          return false; // Excluye el juego si no cumple con el rango de fechas
        }
      }


      // Si pasa todos los filtros, incluye el juego en la lista filtrada
      return true;
    });

    // Aplica la ordenación basada en filters.order
    // console.log('Order:', filters.order);
    if (filters.order === 'asc') {
      this.filteredGames.sort((a, b) => a.averageRating - b.averageRating);
    } else if (filters.order === 'desc') {
      this.filteredGames.sort((a, b) => b.averageRating - a.averageRating);
    }
  }

}
