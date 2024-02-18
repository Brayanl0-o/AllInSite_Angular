import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  constructor(private filterService: FilterService){}

  selectedFilters = {
    platforms: [] as string[],
    genres: [] as string[],
    developers: [] as string [],
    order: '',
    startDate: '',
    endDate: ''

  };
  showFilters = false;
  availablePlatforms: string[] = [ 'Android','PC','PlayStation Vita','PSP','PlayStation 1','PlayStation 2', 'PlayStation 3','PlayStation 4','Xbox 360','Xbox One','Xbox One X','Xbox Series X/S','Wii','Wii U','Nintendo 3DS','Nintendo Switch'];
  availableGenres: string[] = [ 'Acción', 'Aventura','RPG','Estrategia','Deportes','Carreras','Lucha','Shooter','Plataformas','Sandbox','Simulación'];
  availableDevelopers: string []= ['343 Industries','Activision Blizzard','Capcom','CD Projekt Red','Electronic Arts (EA)','Hangar 13','Microsoft Game Studios','Mojang','Nintendo','Rockstar Games','Santa Monica Studio','Sony Interactive Entertainment','Square Enix','Ubisoft']

  ngOnInit(){
    this.resetForm();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  resetForm(){
  this.selectedFilters={
      platforms: [] as string[],
      genres: [] as string[],
      developers: [] as string [],
      order: '',
      startDate: '',
      endDate: ''
  }
  this.filterService.updateFilters(this.selectedFilters);
  }

  showPlatformDropdown: boolean = false;
  togglePlatformDropdown() {
    this.showPlatformDropdown = !this.showPlatformDropdown;
  }

  showGenreDropdown: boolean = true;
  toggleGenreDropdown() {
    this.showGenreDropdown = !this.showGenreDropdown;
  }

  showDeveloperDropdown: boolean = false;
  toggleDeveloperDropdown() {
    this.showDeveloperDropdown = !this.showDeveloperDropdown;
  }

  showOrderDropdown: boolean = false;
  toggleOrderDropdown(order: string) {
    this.selectedFilters.order = order;
    this.showOrderDropdown = false;
    this.applyFilters();
  }

  applyFilters() {
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

  toggleDeveloper(developer:string){
    if(this.selectedFilters.developers.includes(developer)){
      this.selectedFilters.developers = this.selectedFilters.developers.filter(d => d != developer);
    }else{
      this.selectedFilters.developers.push(developer)
    }
  }
}
