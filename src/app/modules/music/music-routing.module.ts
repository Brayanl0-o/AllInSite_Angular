import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MusicHomeComponent } from './pages/music-home/music-home.component';
import { MusicDetailsComponent } from './components/music-details/music-details.component';

const routes: Routes = [
  {
    path: '', component: MusicHomeComponent,
    children: [
      { path: 'song-details/:songId', component: MusicDetailsComponent}
    ]
  },

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
