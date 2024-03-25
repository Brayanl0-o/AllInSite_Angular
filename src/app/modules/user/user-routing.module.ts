import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/modules/auth/pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class userRoutingModule { }
