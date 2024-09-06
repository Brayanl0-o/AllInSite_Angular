import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';

import { videogamesRoutingModule } from './videogames-routing.module';
import { VideogamesComponent } from 'src/app/modules/videogames/pages/videogames/videogames.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { AddVideogameComponent } from './components/add-videogame/add-videogame.component';
import { DetailsGameComponent } from './pages/details-game/details-game.component';
import { AddRequirementsComponent } from './components/add-requirements/add-requirements.component';
import { EditVideogameComponent } from './components/edit-videogame/edit-videogame.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { VideogamesFilterComponent } from './components/videogames-filter/videogames-filter.component';
@NgModule({
  declarations: [
    VideogamesComponent,
    DetailsGameComponent,
    EditVideogameComponent,
    AddRequirementsComponent,
    AddVideogameComponent,
    HeaderSearchComponent,
    LoadingScreenComponent,
    VideogamesFilterComponent,
  ],
  imports: [
    LayoutModule,
    SharedModule,
    MatIconModule,
    CommonModule,
    videogamesRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class VideogamesModule { }
