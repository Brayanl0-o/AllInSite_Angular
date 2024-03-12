import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error500Component } from './components/errors/error500/error500.component';
import { NoResultsComponent } from './components/errors/no-results/no-results.component';
import { SkeletonVideogamesComponent } from './components/skeletons/skeleton-videogames/skeleton-videogames.component';
import { SkeletonProfileComponent } from './components/skeletons/skeleton-profile/skeleton-profile.component';
import { SkeletonHeaderComponent } from './components/skeletons/skeleton-header/skeleton-header.component';
import { SkeletonHomeComponent } from './components/skeletons/skeleton-home/skeleton-home.component';
import { WarningComponent } from './components/warning/warning.component';
import { FooterComponent } from '../layout/components/footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Error404Component,
    Error500Component,
    NoResultsComponent,
    SkeletonVideogamesComponent,
    SkeletonProfileComponent,
    SkeletonHeaderComponent,
    SkeletonHomeComponent,
    WarningComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    Error404Component,
    Error500Component,
    NoResultsComponent,
    SkeletonVideogamesComponent,
    SkeletonProfileComponent,
    SkeletonHeaderComponent,
    SkeletonHomeComponent,
    WarningComponent,
    FooterComponent

  ]
})
export class SharedModule { }
