import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
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
