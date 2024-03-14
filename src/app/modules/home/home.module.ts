import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SliderGamesComponent } from 'src/app/modules/home/components/slider-games/slider-games.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    SliderGamesComponent,
  ],
  imports: [
    LayoutModule,
    CommonModule,
    homeRoutingModule,
    RouterModule,

  ]
})
export class HomeModule { }
