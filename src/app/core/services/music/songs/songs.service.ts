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
    // console.log('Estado actual de songUpdateDetails:', value);
  });
  }

  $songDetails = new EventEmitter<any>();
  $songUpdateDetails = new EventEmitter<any>();

  public createSong(songData:any){
    console.log('songData:', songData);
    const url =`${this.apiUrl}songs/create`;
    return this.http.post(url, songData);
  }
  public getSongs(): Observable<Song[]>{
    const url = `${this.apiUrl}songs/`;
    return this.http.get<Song[]>(url);
  }
  public getSong(songId: string ): Observable<Song>{
    const url = `${this.apiUrl}songs/${songId}`;
    return this.http.get<Song>(url);
  }
  public updateSong(songId: string, songData:any): Observable<any>{
    const url = `${this.apiUrl}songs/update/${songId}`;
    return this.http.patch(url, songData);
  }
  public deleteSong(songId: string): Observable<Song>{
    const url = `${this.apiUrl}songs/delete/${songId}`;
    return this.http.delete<Song>(url);
  }
}

  // public createSong(songData:any){

  //   const url =`${this.apiUrl}songs/create`;
  //   const formData = new FormData();
  //   formData.append('songName', songData.songName);
  //   formData.append('singer', songData.singer);
  //   formData.append('genre', songData.genre);
  //   formData.append('averageRating', songData.averageRating);
  //   formData.append('songImg', songData.songImg);
  //   formData.append('duration', songData.duration);
  //   formData.append('releaseDate', songData.releaseDate);
  //   formData.append('lyrics', songData.lyrics);

  //   return this.http.post(url, formData);

  // }
