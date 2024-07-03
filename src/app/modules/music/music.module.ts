import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicHomeComponent } from './pages/music-home/music-home.component';
import { MusicDetailsComponent } from './pages/music-details/music-details.component';
import { MusicRoutingModule } from './music-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MusicUpdateComponent } from './components/music-update/music-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MusicAddComponent } from './components/music-add/music-add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { MusicAudioPlayerComponent } from './components/music-audio-player/music-audio-player.component';
import { CoreModule } from "../../core/core.module";
import { MusicModalPlaylistComponent } from './components/music-modal-playlist/music-modal-playlist.component';

@NgModule({
  declarations: [
    MusicHomeComponent,
    MusicDetailsComponent,
    MusicUpdateComponent,
    MusicAddComponent,
    MusicAudioPlayerComponent,
    MusicModalPlaylistComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MusicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    CoreModule
  ]
})
export class MusicModule { }
