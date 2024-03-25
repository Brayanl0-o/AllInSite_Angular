import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '../../core/guards/auth/auth.guard';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'login', component: ModalLoginComponent },
  { path: 'send-email', component: SendEmailComponent },
  { path: 'change-password/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  exports: [RouterModule],

})
export class authRoutingModule { }
