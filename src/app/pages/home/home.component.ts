import { Component } from '@angular/core';
import { SliderGamesInterface } from 'src/app/models/slider-games';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public env: string = environment.apiUrl
  userId: string | null = null;

  slides: SliderGamesInterface[]= [
    {url: '../../../assets/img/slider-home/videogames2.webp',title:'videogames2'},
    {url: '../../../assets/img/slider-home/dantes.webp',title:'dantes'},
    {url: '../../../assets/img/slider-home/shadow2.webp',title:'shadow2'},
    {url: '../../../assets/img/slider-home/half_life_2-black-whit.webp',title:'half life 2'},
    {url: '../../../assets/img/slider-home/Mafia1.webp',title:'Mafia1'},
    {url: '../../../assets/img/slider-home/halo.webp',title:'halo'},
    {url: '../../../assets/img/slider-home/madison.webp',title:'madison'},
    {url: '../../../assets/img/slider-home/shadow.webp',title:'shadow'},
    {url: '../../../assets/img/slider-home/half_life_3.webp',title:'half life 3'},
    {url: '../../../assets/img/slider-home/videogames.webp',title:'videogames'},

  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Llama a esta función para obtener el userId cuando el componente se carga.
    this.userId = this.authService.getLoggedInUserId();
  }

  isUserLoggedIn() {
    // Comprueba si el usuario ha iniciado sesion
    return this.authService.loggedIn() || !!this.userId;
  }
}
