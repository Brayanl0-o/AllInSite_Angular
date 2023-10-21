import { Component, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';
import { animate, trigger, style, transition } from '@angular/animations';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('bounce', [
      transition('* => *', [
        animate('0.2s', style({ transform: 'scale(1.2)' })),
        animate('0.2s', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class ProfileComponent {
  @Input() user: User | null = null;
  userId: string | null = null;
  loadDataProfile: boolean = true;
  constructor(private authService: AuthService,
   private userShared: SharedUsersService,
   private route: ActivatedRoute,
   private renderer: Renderer2){     }

    ngOnInit(){
      this.dataUser();
      this.userShared.$modal.subscribe((valu) => { this.isModalVisible = valu })
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
                this.loadDataProfile = false;
                // console.log('Data User prfile', data)
              });
            } else {
              console.error('Error ids diferentes no coinciden')
              // this.router.navigate(['/error']);
            }
        })
      }
    }
    isModalVisible!: boolean;
    openModal(user: User | null): void {
      if (user) {
        this.isModalVisible = true
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
        this.userShared.sendUserData(user);
        console.log('dataUser profileComp: ', user)
      }
    }

    showContentOne = true;
    showContentTwo = false;
    toggleContent() {
      this.showContentOne = !this.showContentOne;
      this.showContentTwo = !this.showContentTwo;
    }

}
