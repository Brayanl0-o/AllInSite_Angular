import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './modules/user/pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { DetailsGameComponent } from './modules/videogames/pages/details-game/details-game.component';
import { Error404Component } from './shared/components/errors/error404/error404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren:() => import('./modules/home/home.module').then(m=> m.HomeModule)},
  { path: 'home/:id', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  { path: 'videogames', loadChildren: () => import('./modules/videogames/videogames.module').then(m => m.VideogamesModule)},
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},


  { path: 'send-email', component: SendEmailComponent },
  { path: 'change-password/:token', component: ResetPasswordComponent },

  { path: '**', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




  // { path: 'videogames', component: VideogamesComponent },

  // { path: 'details-game/:gameId', component: DetailsGameComponent },
  // { path: 'details-game/:userId/:gameId', component: DetailsGameComponent},

  // { path: 'profile/:id', component: ProfileComponent },

  // Ruta wildcard para manejar errores 404

  // { path: 'home', component: HomeComponent },
  // { path: 'home/:id', component: HomeComponent },
