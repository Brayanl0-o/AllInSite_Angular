import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/core/models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  public getSong(): Observable<Song[]>{
    const url = `${this.apiUrl}songs/`;
    return this.http.get<Song[]>(url)
  }
}
