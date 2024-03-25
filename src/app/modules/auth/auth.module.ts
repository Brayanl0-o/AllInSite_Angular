import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { authRoutingModule } from './auth-routing.module';
import { RegisterComponent } from '../user/pages/register/register.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';

@NgModule({
  declarations: [
    RegisterComponent,
    ModalLoginComponent,
    ResetPasswordComponent,
    SendEmailComponent,
  ],
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule,
    authRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    RegisterComponent,
    ModalLoginComponent,
    ResetPasswordComponent,
    SendEmailComponent,
  ]
})
export class AuthModule { }
