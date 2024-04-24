import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
    this.$songUpdateDetails.subscribe((value: boolean) => {
    console.log('Estado actual de songUpdateDetails:', value);
  });
  }

  $songDetails = new EventEmitter<any>();
  $songUpdateDetails = new EventEmitter<any>();



  public getSongs(): Observable<Song[]>{
    const url = `${this.apiUrl}songs/`;
    return this.http.get<Song[]>(url)
  }
  public getSong(songId: string ): Observable<Song>{
    const url = `${this.apiUrl}songs/${songId}`;
    return this.http.get<Song>(url)
  }
  public updateSong(songId: string): Observable<Song>{
    const url = `${this.apiUrl}songs/update/${songId}`
    return this.http.get<Song>(url)

  }
}
