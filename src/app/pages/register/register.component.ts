import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  contactForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.contactForm = this.initFrom();
  }

  onSubmit(): void {
    // console.log('form ->', this.contactForm.value);
    if (this.contactForm.valid) {
      this.signUp();
    }
  }
  isRegisterOk: boolean = false;


  // Var para guardar y manejar el error
  errorResponseMessage: string | null = null;

  // Metodo para manejar el registro del usuario
  signUp() {
    this.authService.signUp(this.contactForm.value)
      .subscribe(res => {
        this.contactForm = this.initFrom();
        this.isRegisterOk= true;
      },
        err => {
          // console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.errorResponseMessage = err.error.message;
            this.isRegisterOk= false;
          }
        }
      );
  }

  defaultUserImgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIip2Y--IFllD0cow5w64ZrJD-S7oC9pjhc1mELWbqIuk3m2RF';
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
      years: ['',[Validators.required, this.numbersOnlyValidator, Validators.minLength(2), Validators.maxLength(3)]],
      phoneNumber: ['', [this.numbersOnlyValidator]],
      country: ['Colombia'],
      userImg: [this.defaultUserImgUrl],
    })

  }

  formRegisterAlert(): void {
    window.alert('Todos los campos con * son obligatorios')
  }

}
