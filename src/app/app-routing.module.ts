import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideogamesComponent } from './pages/videogames/videogames.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { DetailsGameComponent } from './pages/details-game/details-game.component';
import { Error404Component } from './components/errors/error404/error404.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'videogames', component: VideogamesComponent },
  {
    path: 'details-game/:gameId',
    component: DetailsGameComponent
  },
  // Ruta para usuarios logeados
  {
    path: 'details-game/:userId/:gameId',
    component: DetailsGameComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'send-email', component: SendEmailComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Ruta wildcard para manejar errores 404
  { path: '**', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
