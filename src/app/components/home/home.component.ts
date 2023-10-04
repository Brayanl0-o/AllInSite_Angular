import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  games: Game[] = [];
  filteredGames: Game[] = [];

  constructor(
    private homeService: HomeService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loadGameData();

    this.filterService.filters$.subscribe((filters) => {
      console.log('Filters received in HomeComponent:', filters);
      this.applyFilters(filters);
    });
  }

  private loadGameData() {
    this.homeService.getGame().subscribe((data: Game[]) => {
      this.games = data;
      this.filteredGames = [...this.games];
      // console.log('dataload',data);
    });
  }

  applyFilters(filters: any) {
    this.filteredGames = this.games.filter((game) => {
      // Verifica si al menos una de las plataformas seleccionadas está en la lista de plataformas del juego
      if (filters.platforms.length > 0) {
        const hasSelectedPlatform = filters.platforms.some((platform: string) =>
          game.platform.toLowerCase().includes(platform.toLowerCase())
        );

        if (!hasSelectedPlatform) {
          return false;
        }
      }

      // Verifica si al menos uno de los géneros seleccionados está en la lista de géneros del juego
      if (filters.genres.length > 0) {
        const hasSelectedGenre = filters.genres.some((genre: string) => // Especifica el tipo como string
          game.genre.toLowerCase().includes(genre.toLowerCase())
        );

        if (!hasSelectedGenre) {
          return false;
        }
      }

      // Si pasa todos los filtros, incluye el juego en la lista filtrada
      return true;
    });
  }
}
