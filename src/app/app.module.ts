import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideogamesComponent } from './pages/videogames/videogames.component';
import { SliderGamesComponent } from './components/slider-games/slider-games.component';
import { CommonModule } from '@angular/common';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { RegisterComponent } from './pages/register/register.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { DetailsGameComponent } from './pages/details-game/details-game.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error500Component } from './components/errors/error500/error500.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkeletonVideogamesComponent } from './components/skeletons/skeleton-videogames/skeleton-videogames.component';
import { SkeletonProfileComponent } from './components/skeletons/skeleton-profile/skeleton-profile.component';
import { SkeletonHeaderComponent } from './components/skeletons/skeleton-header/skeleton-header.component';
import { SkeletonHomeComponent } from './components/skeletons/skeleton-home/skeleton-home.component';
import { PaginationVideogamesComponent } from './components/pagination-videogames/pagination-videogames.component';

import { MatIconModule } from '@angular/material/icon';
import { AddVideogameComponent } from './components/add-videogame/add-videogame.component';
import { EditVideogameComponent } from './components/edit-videogame/edit-videogame.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoResultsComponent } from './components/errors/no-results/no-results.component';
import { AddRequirementsComponent } from './components/add-requirements/add-requirements.component';
import { SkeletonDetailsGamesComponent } from './components/skeletons/skeleton-details-games/skeleton-details-games.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AsideComponent,
    HeaderComponent,
    VideogamesComponent,
    SliderGamesComponent,
    HeaderSearchComponent,
    RegisterComponent,
    ModalLoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    SendEmailComponent,
    DetailsGameComponent,
    Error404Component,
    Error500Component,
    UpdateUserComponent,
    SkeletonVideogamesComponent,
    SkeletonProfileComponent,
    SkeletonHeaderComponent,
    SkeletonHomeComponent,
    PaginationVideogamesComponent,
    AddVideogameComponent,
    EditVideogameComponent,
    LoadingScreenComponent,
    FooterComponent,
    NoResultsComponent,
    AddRequirementsComponent,
    SkeletonDetailsGamesComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule

  ],
  providers: [ResetPasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
