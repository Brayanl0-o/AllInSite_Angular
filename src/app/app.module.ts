import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { AngularFireModule } from '@angular/fire/compat';
// import { environment } from '../environments/environment';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AuthModule } from './modules/auth/auth.module';
import { ResetPasswordService } from './core/services/reset-password/reset-password.service';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LayoutModule,
    SharedModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
  ],
  providers: [ResetPasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
