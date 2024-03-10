import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from 'src/app/core/services/reset-password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(
    private routeActivated: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  passwordForm: FormGroup;
  passwordMismatch: boolean = false;
  token: string = '';

  get f() {
    return this.passwordForm.controls;
  }

  ngOnInit(): void {
    const tokenParam = this.routeActivated.snapshot.paramMap.get('token');
    this.token = tokenParam !== null ? tokenParam : '';
  }

  passwordsMatch(): boolean {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    // Verifica que el formulario exista y es válido
    if (this.passwordForm && this.passwordForm.valid) {
      const password = this.passwordForm.get('password')?.value;
      const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

      if (password === confirmPassword) {
        // Las contraseñas coinciden, puedes continuar con la solicitud al servidor
        this.resetPasswordService.changePassword(password, this.token).subscribe(
          (response) => {
            this.successMessage = 'Contraseña cambiada exitosamente.';
            this.router.navigate(['/home']);
          },
          (error) => {
            if (error.status === 403) {
              this.errorMessage = 'Acceso no autorizado. Por favor, inicia sesión nuevamente.';
            } else if (error.status === 403) {
              this.errorMessage = 'Acceso no autorizado. Por favor, inicia sesión nuevamente.';
            }else {
              this.errorMessage = 'Error al cambiar la contraseña. Por favor, intenta de nuevo.';
            }
          }
        );
      } else {
        // Las contraseñas no coinciden, muestra un mensaje de error
        this.passwordMismatch = true;
        this.errorMessage = 'La nueva contraseña es inválida.';
      }
    }
  }
}
