import { Component, Input, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { SharedUsersService } from 'src/app/core/services/sharedUsers/shared-users.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  constructor(private userShared: SharedUsersService,
    private fb: FormBuilder,
    private renderer: Renderer2) { }

  @Input() user:User = {} as User;
  contactForm!: FormGroup;
  errorResponseMessageForm = '';

  ngOnInit(): void{
    this.contactForm = this.initFrom();
    this.contactForm.patchValue(this.user);
  }

  onSubmit(){
    if(this.contactForm.valid){
      this.updateUserData();
    }else {
      this.errorResponseMessageForm = 'Verifique el formulario! ';
        setTimeout(() => {
          this.errorResponseMessageForm = '';
        }, 5000);
    }
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

      },
      (error) => {
        console.error('Error al actualizar los datos:', error);
      }
    );
  }

  initFrom(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(30), Validators.pattern('[A-Za-z\\s]+')]],
      lastName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(30), Validators.pattern('[A-Za-z\\s]+')]],
      email: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      years: ['',[this.rankValidator, this.numberOnlyValidator]],
      phoneNumber: ['', [this.numberOnlyValidator, Validators.minLength(3),Validators.maxLength(15)]],
      country: ['Colombia',[Validators.minLength(3),Validators.maxLength(25)]],
      descriptionUser: ['Sin Descripcion...',[Validators.maxLength(500)]],

    })
  }

  numberOnlyValidator(control:FormControl){
    const value = control.value;
    if (value && !/^\d+$/.test(value)){
      return {numbersOnly: true};
    }
    return null;
  }

  rankValidator(control: AbstractControl){
    const number = control.value;

    if(isNaN(number) || number < 0 || number > 150){
        return {rankNumber: true};
    }
    return null;
  }


  closeModalAndReloadPage() {
    this.closeModal();
    window.location.reload();
  }

  closeModal() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.userShared.$modal.emit(false)
  }
}
