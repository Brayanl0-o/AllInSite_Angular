import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '../modules/auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    SharedModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
