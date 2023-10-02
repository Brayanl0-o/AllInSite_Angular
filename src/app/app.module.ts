import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { MusicDetailsComponent } from './components/music-details/music-details.component';
import { HomeComponent } from './components/home/home.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicListComponent,
    MusicDetailsComponent,
    HomeComponent,
    AsideComponent,
    HeaderComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
