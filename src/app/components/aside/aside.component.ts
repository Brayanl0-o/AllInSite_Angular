import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  selectedFilters = {
    platforms: [],
    genres: [],
    developers: [],
    highRating: false,
    lowRating: false
  };

  availablePlatforms: string[] = ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'];
  availableGenres: string[] = ['Sandbox', 'Acción y Aventura', 'Aventura', /* Agrega más géneros aquí */];
  availableDevelopers: string[] = ['Mojang Studios', 'Rockstar Games', 'Ubisoft', 'Nintendo', /* Agrega más desarrolladores aquí */];
constructor(private filterService: FilterService){ console.log('filtrSelected from asideC',this.selectedFilters) }

applyFilters() {
  // Llama al método updateFilters del servicio FilterService para actualizar los filtros
  this.filterService.updateFilters(this.selectedFilters);

}


}
