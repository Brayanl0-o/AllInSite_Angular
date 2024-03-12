import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
@NgModule({
  declarations: [
    RegisterComponent,
    ModalLoginComponent
  ],
  imports: [
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
