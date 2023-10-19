import { Component, Input, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SharedUsersService } from 'src/app/services/sharedUsers/shared-users.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  @Input() user:User = {} as User;
  contactForm!: FormGroup;

  constructor(private userShared: SharedUsersService,
    private fb: FormBuilder,
    private renderer: Renderer2) { }


    ngOnInit(): void{
      this.contactForm = this.initFrom();
      this.contactForm.patchValue(this.user);
    }

    defaultUserImgUrl = 'https://p1.hiclipart.com/preview/403/536/937/internet-logo-user-user-profile-symbol-wifi-user-account-computer-avatar-png-clipart.jpg';

    numbersOnlyValidator(control: FormControl) {
      const value = control.value;
      if (value && !/^\d+$/.test(value)) {
        return { numbersOnly: true };
      }
      return null;
    }
    initFrom(): FormGroup {
      return this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z\\s]+')]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z\\s]+')]],
        email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        years: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
        phoneNumber: ['', [this.numbersOnlyValidator]],
        country: ['Colombia'],
        userImg: [this.defaultUserImgUrl],
        descriptionUser: ['Sin Descripcion...'],
      })
    }

    updateUserData(): void {

      if (!this.user) {
        console.error('Error: No se proporcionaron datos para la actualización.');
        return;
      }

      this.user = { ...this.user, ...this.contactForm.value };

      this.userShared.updateUser(this.user._id, this.user).subscribe(
        (response) => {
          this.closeModalAndReloadPage();
          console.log('Datos act con exito:', response);
          // console.log('carga de userData:', this.user);
        },
        (error) => {
          console.error('Error al actualizar los datos:', error);
        }
      );
    }

    closeModalAndReloadPage() {
      this.closeModal();
      window.location.reload();
    }

    closeModal() {
      console.log('close modal')
      this.renderer.removeStyle(document.body, 'overflow');
      this.userShared.$modal.emit(false)
      console.log('Modal cerrado');
    }
}
