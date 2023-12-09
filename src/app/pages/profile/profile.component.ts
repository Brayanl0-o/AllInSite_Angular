import { Component, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';
import { environment } from 'src/environments/environment';
const apiBaseUrl= environment.apiUrl;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() user: User | null = null;
  userId: string | null = null;
  loadDataProfile: boolean = true;
  imageUrl!: string;
  selectedFile: File | null = null;

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

            const id = paramMap.get('id');
            this.imageUrl = `${apiBaseUrl}uploads/users/`;

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

    onFileSelectedUser(event: Event):void {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement?.files?.[0];
      if (file){
        this.selectedFile = file;
      }
    }

    userImg = '';
    newUserImg = '';
    isEditingImg = false;


    updateDataUser(userImg:File):void{
      console.log('execute updateDataUser')
      console.log('file selected ', this.selectedFile)

      if(!this.user){
        console.error('Error: No hay datos de actualizacíón')
        return;
      }
      const updatedData = {
        userImg: this.newUserImg
      };

      this.userShared.updateUserImg(this.user._id, updatedData, userImg).subscribe(
        (response)=> {
          if(this.user){
            this.user.userImg = this.newUserImg

          }
          console.log('Datos act con exito:', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error al updated', error);
        }
      );
      this.isEditingImg = false;

    }

    cancelEditImg(){
      this.newUserImg = this.userImg;
      this.isEditingImg = false;
    }

    isModalVisible!: boolean;
    openModal(user: User | null): void {
      if (user) {
        this.isModalVisible = true
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
        this.userShared.sendUserData(user);
        // console.log('dataUser profileComp: ', user)
      }
    }

    showContentOne = true;
    showContentTwo = false;
    toggleContent() {
      this.showContentOne = !this.showContentOne;
      this.showContentTwo = !this.showContentTwo;
    }

}
