import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { FormsModule } from '@angular/forms';
import { VideogamesComponent } from './pages/videogames/videogames.component';
import { SliderGamesComponent } from './components/slider-games/slider-games.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AsideComponent,
    HeaderComponent,
    GameDetailsComponent,
    VideogamesComponent,
    SliderGamesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
