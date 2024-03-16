import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './components/errors/not-found-404/not-found-404.component';
import { NoResultsComponent } from './components/errors/no-results/no-results.component';
import { BadRequest400Component } from './components/errors/bad-request-400/bad-request-400.component';
import { ServiceUnavailable503Component } from './components/errors/service-unavailable-503/service-unavailable-503.component';
import { InternalServerError500Component } from './components/errors/internal-server-error-500/internal-server-error-500.component';
import { Unauthorized401Component } from './components/errors/unauthorized-401/unauthorized-401.component';
import { Forbidden403Component } from './components/errors/forbidden-403/forbidden-403.component';


const routes: Routes = [
  // { path: 'no', component: NoResultsComponent },
  { path: 'error-400', component: BadRequest400Component},
  { path: 'error-401', component: Unauthorized401Component},
  { path: 'error-403', component: Forbidden403Component},
  { path: 'error-404', component: NotFound404Component },
  { path: 'error-500', component: InternalServerError500Component},
  { path: 'error-503', component: ServiceUnavailable503Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class sharedRoutingModule { }
