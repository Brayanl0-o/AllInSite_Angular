import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { Componente1 } from './componente1.component';
// import { Componente2 } from './componente2.component';

const routes: Routes = [
  // { path: 'componente1', component: Componente1 },
  // { path: 'componente2', component: Componente2 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class authRoutingModule { }
