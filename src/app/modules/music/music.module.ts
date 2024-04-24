import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicHomeComponent } from './pages/music-home/music-home.component';
import { MusicDetailsComponent } from './components/music-details/music-details.component';
import { MusicRoutingModule } from './music-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MusicUpdateComponent } from './components/music-update/music-update.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MusicHomeComponent,
    MusicDetailsComponent,
    MusicUpdateComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MusicRoutingModule,
    ReactiveFormsModule

  ]
})
export class MusicModule { }
