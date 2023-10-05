import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  selectedFilters = {
    platforms: [] as string[], // Define platforms as an array of strings
    genres: [] as string[]

  };

  availablePlatforms: string[] = ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'];
  availableGenres: string[] = ['Sandbox', 'Acción y Aventura', 'Aventura'];

constructor(private filterService: FilterService)
{ console.log('filtrSelected from asideC',this.selectedFilters) }

applyFilters() {
  // Llama al método updateFilters del servicio FilterService para actualizar los filtros
  this.filterService.updateFilters(this.selectedFilters);

}

togglePlatform(platform: string) {
  if (this.selectedFilters.platforms.includes(platform)) {
    this.selectedFilters.platforms = this.selectedFilters.platforms.filter(p => p !== platform);
  } else {
    this.selectedFilters.platforms.push(platform);
  }
}

toggleGenre(genre: string) {
  if (this.selectedFilters.genres.includes(genre)) {
    this.selectedFilters.genres = this.selectedFilters.genres.filter(g => g !== genre);
  } else {
    this.selectedFilters.genres.push(genre);
  }
}

}
