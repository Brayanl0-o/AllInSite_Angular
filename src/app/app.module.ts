import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { MusicDetailsComponent } from './components/music-details/music-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicListComponent,
    MusicDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
