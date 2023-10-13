import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user: User | null = null;
  userId: string | null = null;

  constructor(private authService: AuthService,
   private userShared: SharedUsersService,
   private route: ActivatedRoute){     }

    ngOnInit(){
      this.dataUser();
    }

    dataUser(){
      const loggedInUserId = this.authService.getLoggedInUserId();

      if(loggedInUserId){
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
        })
      }
    }

}
