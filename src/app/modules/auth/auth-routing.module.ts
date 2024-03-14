import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
// import { ModalLoginComponent } from './components/modal-login/modal-login.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: ModalLoginComponent},
  { path: 'send-email', component: SendEmailComponent },
  { path: 'change-password/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class authRoutingModule { }
