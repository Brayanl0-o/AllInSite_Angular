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
    {url: '../../../assets/img/dantes.jpg',title:'ejemplo'},
    {url: '../../../assets/img/shadow2.jpg',title:'ejemplo'},
    {url: '../../../assets/img/half_life_2-black-whit.jpeg',title:'ejemplo'},
    {url: '../../../assets/img/Mafia1.jpg',title:'ejemplo'},
    {url: '../../../assets/img/halo.jpg',title:'ejemplo'},
    {url: '../../../assets/img/madison.png',title:'ejemplo'},
    {url: '../../../assets/img/shadow.jpg',title:'ejemplo'},
    {url: '../../../assets/img/half_life_3.jpeg',title:'ejemplo'},
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
