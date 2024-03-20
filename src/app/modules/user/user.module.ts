import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent,
    UpdateUserComponent
  ],
  imports: [
    LayoutModule,
    SharedModule,
    CommonModule,
    userRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
