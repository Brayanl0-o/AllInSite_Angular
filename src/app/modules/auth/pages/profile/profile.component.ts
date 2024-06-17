import { Component, Input, Renderer2 } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SharedUsersService } from 'src/app/core/services/sharedUsers/shared-users.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
const apiBaseUrl= environment.apiUrl;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  constructor(private authService: AuthService,
   private userShared: SharedUsersService,
   private router: Router,
   private renderer: Renderer2){     }

    @Input() user: User | null = null;
    userId: string | null = null;
    loadDataProfile: boolean = true;
    imageUrl!: string;
    selectedFile: File | null = null;
    userImg = '';
    newUserImg = '';
    isEditingImg = false;
    isLoading = false;

  ngOnInit(){
    this.dataUser();
    this.userShared.$modal.subscribe((valu) => { this.isModalVisible = valu })
  }

  dataUser(){
    const loggedInUserId = this.authService.getLoggedInUserId();
    if(loggedInUserId){
          const userId = loggedInUserId;
          this.imageUrl = `${apiBaseUrl}uploads/users/medium/`;
            this.userShared.getUserById(userId ).subscribe(data => {
              this.user = data;
              this.loadDataProfile = false;
            });
    }else{
      this.router.navigate(['/error-401']);
    }
  }

  onFileSelectedUser(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file){
      this.selectedFile = file;
    }
  }

  updateDataUser(userImg:File):void{
    this.isLoading = true;

    // if(!this.user){
    //   this.isLoading = false;
    //   console.error('Error: No hay datos de actualizacíón')
    //   return;
    // }
    const updatedData = {
      userImg: this.newUserImg
    };

    this.userShared.updateUserImg(this.user!._id, userImg).subscribe(
      (response)=> {
          this.user!.userImg = this.newUserImg;
          this.isLoading = false;
          this.isEditingImg = false;
          this.renderer.removeStyle(document.body, 'overflow');
          window.location.reload();
          this.dataUser();
        this.dataUser();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al updated', error);
      }
    );
    // this.isEditingImg = false;
  }

  cancelEditImg(){
    this.isEditingImg = false;
    this.renderer.removeStyle(document.body, 'overflow');
  }

  openModalImg(){
    this.isEditingImg = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }
  isModalVisible!: boolean;
  openModal(user: User | null): void {
    if (user) {
      this.isModalVisible = true
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
      this.userShared.sendUserData(user);
    }
  }

  showContentOne = true;
  showContentTwo = false;
  toggleContent() {
    this.showContentOne = !this.showContentOne;
    this.showContentTwo = !this.showContentTwo;
  }
  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
