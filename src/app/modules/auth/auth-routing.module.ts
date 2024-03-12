import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
// import { ModalLoginComponent } from './components/modal-login/modal-login.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: ModalLoginComponent},

  // { path: 'componente2', component: Componente2 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class authRoutingModule { }
