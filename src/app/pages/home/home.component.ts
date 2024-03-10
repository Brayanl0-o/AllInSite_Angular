import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public env: string = environment.apiUrl
  userId: string | null = null;

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
