import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideogamesComponent } from './pages/videogames/videogames.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'videogames', component: VideogamesComponent }

  // Ruta wildcard para manejar errores 404
  // { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
