import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
// import { ModalLoginComponent } from '../../shared/components/modal-login/modal-login.component';
import { LayoutModule } from 'src/app/layout/layout.module';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
@NgModule({
  declarations: [
    RegisterComponent,
    ModalLoginComponent,
  ],
  imports: [
    // CoreModule,
    // LayoutModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    authRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    RegisterComponent,
    ModalLoginComponent
  ]
})
export class AuthModule { }
