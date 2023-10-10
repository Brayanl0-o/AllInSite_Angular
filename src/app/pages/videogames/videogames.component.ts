import { Component } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.css']
})
export class VideogamesComponent {
  games: Game[] = [];
  filteredGames: Game[] = [];

  constructor(
    private videogamesService: VideogamesService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loadGameData();

    this.filterService.filters$.subscribe((filters) => {
      console.log('Filters received in HomeComponent:', filters);
      this.applyFilters(filters);
    });
  }
  searchTerm: string = '';
  searchGames() {
    // Filtra los juegos en función del término de búsqueda
    this.filteredGames = this.games.filter((game) =>
      game.gameName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  showPopover = false;
  showPopoverMouseEnter(game:any) {
   game.showPopover = true;
  }

  hidePopoverMouseLeave(game:any) {
    game.showPopover = false;
  }

  private loadGameData() {
    this.videogamesService.getGame().subscribe((data: Game[]) => {
      this.games = data;
      this.filteredGames = [...this.games];
      // console.log('dataload',data);
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
    console.log('Order:', filters.order);
    if (filters.order === 'asc') {
      this.filteredGames.sort((a, b) => a.averageRating - b.averageRating);
    } else if (filters.order === 'desc') {
      this.filteredGames.sort((a, b) => b.averageRating - a.averageRating);
    }
  }

}
