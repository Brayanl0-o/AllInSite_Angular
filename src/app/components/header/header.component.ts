import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
const apiBaseUrl= environment.apiUrl;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Input() user: User | null = null;
    users: User []= [];
    userId: string | null = null;
    loadingData: boolean = true;
    imageUrl!: string;

    constructor(private userShared: SharedUsersService,
      private authService: AuthService,
      private route: ActivatedRoute){}


      ngOnInit(){
        this.dataUser();

      }

    isUserLoggedIn() {
      return this.authService.loggedIn();
    }
    //Cerrar sesión
    logout() {
      this.authService.logout()
    }

    dataUser() {
      // Obtiene el ID del usuario logueado desde el servicio de autenticación
      const loggedInUserId = this.authService.getLoggedInUserId();
      // console.log('loggedInUserId:', loggedInUserId);

      if (loggedInUserId) {
        // Asignar el userId obtenido al userId del componente
        this.userId = loggedInUserId;
        this.route.paramMap.subscribe(paramMap => {
        this.imageUrl = `${apiBaseUrl}uploads/users/`;

          // Obtiene el ID de usuario de la URL
          const id = paramMap.get('id');
           // console.log('Id Login: ', id)

          // Comprueba si el ID de usuario de la URL coincide con el usuario logueado
          if (id === loggedInUserId) {
            this.userShared.getUser(id).subscribe(data => {
              this.user = data;
              this.loadingData = false;
              // console.log('Data User prfile', data)
            });
          } else {
            // console.error('No login')
            // this.router.navigate(['/error']);
          }
        });
      }
    }

    optionsVisible = false;
    showOptions(){
      this.optionsVisible = !this.optionsVisible;
    }

    menuVisible = false;
    showMenu(){
      this.menuVisible = !this.menuVisible;
    }

}
