import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './shared/components/errors/not-found-404/not-found-404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren:() => import('./modules/home/home.module').then(m=> m.HomeModule)},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  { path: 'music', loadChildren:()=>import('./modules/music/music.module').then(m => m.MusicModule)},
  { path: 'videogames', loadChildren: () => import('./modules/videogames/videogames.module').then(m => m.VideogamesModule)},
  { path: 'errors', loadChildren:() => import('./shared/shared.module').then(m=> m.SharedModule) },
  { path: '**', component: NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


