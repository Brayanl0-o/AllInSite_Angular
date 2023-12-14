import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }
  contactForm!: FormGroup;
  isRegisterOk: boolean = false;
  selectedFile: File | null = null;
  errorResponseMessage: string | null = null;

  ngOnInit(): void {
    this.contactForm = this.initFrom();
  }
  errorResponseMessageForm = '';
  onSubmit() {
    // console.log('form ->', this.contactForm.value);
    if (this.contactForm.valid) {
      this.signUp();
    }else {
      this.errorResponseMessageForm = 'Verifique el formulario! ';
        setTimeout(() => {
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }

  onFileSelectedUser(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file){
      this.selectedFile = file;
    }
  }

  signUp() {
    if (this.contactForm.valid) {
      console.log('Funcion signUpx2EjecuteSuccess');

      const userData = this.contactForm.value;
      const formData = new FormData();

      console.log('formData', formData);

      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      formData.append('email', userData.email);
      formData.append('phoneNumber', userData.phoneNumber);
      formData.append('password', userData.password);
      formData.append('years', userData.years);
      formData.append('country', userData.country);
      formData.append('userImg', this.selectedFile!);

      console.log('userData before service call:', userData);
      console.log('userImg before service call:', this.selectedFile);


      this.authService.signUp(userData, this.selectedFile).subscribe(
        (response) => {
          console.log('Usuario registrado correctamente', response);
          this.contactForm = this.initFrom();

          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          if(fileInput){
            fileInput.value= '';
          }

          this.selectedFile = null;
          this.isRegisterOk= true;
        },
        (error) => {
          console.error('Error al registrarse in subscribe', error);
          if (error instanceof HttpErrorResponse) {
            this.errorResponseMessage = error.error.message;
            this.isRegisterOk= false;

          }
        }
      )
    } else {
      setTimeout(() => {
        this.errorResponseMessage = '';
        console.log('Error al enviar el formulario en if de SignUp ', this.errorResponseMessage);
      }, 1000);
    }
  }

  initFrom(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(30), Validators.pattern('[A-Za-z\\s]+')]],
      lastName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(30), Validators.pattern('[A-Za-z\\s]+')]],
      email: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      years: ['',[this.rangoNumericoValidator, this.numbersOnlyValidator]],
      phoneNumber: ['', [this.numbersOnlyValidator, Validators.minLength(3),Validators.maxLength(15)]],
      country: ['Colombia',[Validators.minLength(3),Validators.maxLength(25)]],
    })

  }
  numbersOnlyValidator(control: FormControl) {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { numbersOnly: true };
    }
    return null;
  }
  rangoNumericoValidator(control:AbstractControl) {
    const valor = control.value;

    if (isNaN(valor) || valor < 0 || valor > 150) {
      return { 'rangoNumerico': true };
    }

    return null;
  }
  formRegisterAlert(): void {
    window.alert('Todos los campos con * son obligatorios')
  }

}
