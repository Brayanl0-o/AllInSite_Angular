import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideogamesComponent } from 'src/app/modules/videogames/pages/videogames/videogames.component';
import { DetailsGameComponent } from './pages/details-game/details-game.component';


const routes: Routes = [
  { path: '', component: VideogamesComponent},
  { path: 'details-game/', component: DetailsGameComponent },
  { path: 'details-game/:gameId', component: DetailsGameComponent},
  // { path: 'details-game/:gameId', component: DetailsGameComponent },
  // { path: 'details-game/:userId/:gameId', component: DetailsGameComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class videogamesRoutingModule { }
