import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';
@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component {
  @Input() user: User | null = null;
  userId: string | null = null;

  constructor(private router:Router,
    private userShared:SharedUsersService,
    private authService: AuthService,
    private route: ActivatedRoute){}

    ngOnInit(){
      this.dataUser()
    }

    isUserLoggedIn(){
      return this.authService.loggedIn();
    }

    dataUser() {
      // Obtiene el ID del usuario logueado desde el servicio de autenticación
      const loggedInUserId = this.authService.getLoggedInUserId();
      console.log('loggedInUserId:', loggedInUserId);

      if (loggedInUserId) {
        // Asignar el userId obtenido al userId del componente
        this.userId = loggedInUserId;
        this.route.paramMap.subscribe(paramMap => {

          // Obtiene el ID de usuario de la URL
          const id = paramMap.get('id');
          console.log('Id Login: ', id)

          // Comprueba si el ID de usuario de la URL coincide con el usuario logueado
          if (id === loggedInUserId) {
            this.userShared.getUser(id).subscribe(data => {
              this.user = data;
              // console.log('Data User prfile', data)
            });
          } else {
            console.error('Error ids diferentes no coinciden')
            // this.router.navigate(['/error']);
          }
        });
      }
    }

}
