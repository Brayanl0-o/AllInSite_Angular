import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonVideogamesComponent } from './components/skeletons/skeleton-videogames/skeleton-videogames.component';
import { SkeletonProfileComponent } from './components/skeletons/skeleton-profile/skeleton-profile.component';
import { SkeletonHeaderComponent } from './components/skeletons/skeleton-header/skeleton-header.component';
import { SkeletonHomeComponent } from './components/skeletons/skeleton-home/skeleton-home.component';
import { WarningComponent } from './components/warning/warning.component';
import { RouterModule } from '@angular/router';
import { NoResultsComponent } from './components/errors/no-results/no-results.component';
import { BadRequest400Component } from './components/errors/bad-request-400/bad-request-400.component';
import { ServiceUnavailable503Component } from './components/errors/service-unavailable-503/service-unavailable-503.component';
import { InternalServerError500Component } from './components/errors/internal-server-error-500/internal-server-error-500.component';
import { Forbidden403Component } from './components/errors/forbidden-403/forbidden-403.component';
import { Unauthorized401Component } from './components/errors/unauthorized-401/unauthorized-401.component';
import { NotFound404Component } from './components/errors/not-found-404/not-found-404.component';
import { sharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [
    SkeletonVideogamesComponent,
    SkeletonProfileComponent,
    SkeletonHeaderComponent,
    SkeletonHomeComponent,
    WarningComponent,
    NotFound404Component,
    NoResultsComponent,
    BadRequest400Component,
    ServiceUnavailable503Component,
    InternalServerError500Component,
    Forbidden403Component,
    Unauthorized401Component,
  ],
  imports: [
    CommonModule,
    sharedRoutingModule,
    RouterModule,
  ],
  exports: [
    SkeletonVideogamesComponent,
    SkeletonProfileComponent,
    SkeletonHeaderComponent,
    SkeletonHomeComponent,
    WarningComponent,
    NotFound404Component,
    NoResultsComponent,
    BadRequest400Component,
    ServiceUnavailable503Component,
    InternalServerError500Component,
    Forbidden403Component,
    Unauthorized401Component,
  ]
})
export class SharedModule { }
