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

import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ResetPasswordService } from './core/services/reset-password/reset-password.service';

// import { AngularFireModule } from '@angular/fire/compat';
// import { environment } from '../environments/environment';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,

    // auth
    ResetPasswordComponent,
    SendEmailComponent,
  ],
  imports: [
    // AuthModule,
    // HomeModule,
    LayoutModule,
    SharedModule,
    CommonModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,

  ],
  providers: [ResetPasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// import { UpdateUserComponent } from './modules/user/components/update-user/update-user.component';
// import { ProfileComponent } from './modules/user/pages/profile/profile.component';
// import { DetailsGameComponent } from './modules/videogames/pages/details-game/details-game.component';
// import { EditVideogameComponent } from './modules/videogames/components/edit-videogame/edit-videogame.component';
// import { LoadingScreenComponent } from './modules/videogames/components/loading-screen/loading-screen.component';
// import { AddRequirementsComponent } from './modules/videogames/components/add-requirements/add-requirements.component';
// import { AddVideogameComponent } from './modules/videogames/components/add-videogame/add-videogame.component';
// import { AsideComponent } from './modules/videogames/components/aside/aside.component';
// import { VideogamesComponent } from './modules/videogames/pages/videogames/videogames.component';
// import { HeaderSearchComponent } from './modules/videogames/components/header-search/header-search.component';
// import { Error404Component } from './shared/components/errors/error404/error404.component';
// import { Error500Component } from './shared/components/errors/error500/error500.component';
// import { FooterComponent } from './layout/components/footer/footer.component';
// import { NoResultsComponent } from './shared/components/errors/no-results/no-results.component';
// import { SkeletonVideogamesComponent } from './shared/components/skeletons/skeleton-videogames/skeleton-videogames.component';
// import { SkeletonProfileComponent } from './shared/components/skeletons/skeleton-profile/skeleton-profile.component';
// import { SkeletonHeaderComponent } from './shared/components/skeletons/skeleton-header/skeleton-header.component';
// import { SkeletonHomeComponent } from './shared/components/skeletons/skeleton-home/skeleton-home.component';
// import { WarningComponent } from './shared/components/warning/warning.component';
// import { ModalLoginComponent } from './modules/auth/components/modal-login/modal-login.component';
// import { HeaderComponent } from './layout/components/header/header.component';
// import { SliderGamesComponent } from './components/slider-games/slider-games.component';
// import { RegisterComponent } from './modules/auth/pages/register/register.component';
// import { HomeComponent } from './modules/home/pages/home/home.component';

  // HomeComponent,

    // HeaderComponent,

    // RegisterComponent,
    // SliderGamesComponent,

    // ModalLoginComponent,

    // Error404Component,
    // Error500Component,
    // NoResultsComponent,

    // SkeletonVideogamesComponent,
    // SkeletonProfileComponent,
    // SkeletonHeaderComponent,
    // SkeletonHomeComponent,
    // WarningComponent,
    // FooterComponent,

    // AsideComponent,
    // VideogamesComponent,
    // HeaderSearchComponent,
    // AddVideogameComponent,
    // DetailsGameComponent,
    // EditVideogameComponent,
    // LoadingScreenComponent,
    // AddRequirementsComponent,
    // SkeletonDetailsGamesComponent,
    // ProfileComponent,
    // UpdateUserComponent,
