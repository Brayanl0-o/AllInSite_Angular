import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '../modules/auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    SharedModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
