import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song, Track } from 'src/app/core/models/song';

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
  $modalPlaylist = new EventEmitter<any>();

  public createSong(songData:any){
    console.log('songData:', songData);
    const url =`${this.apiUrl}songs/create`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.post(url, songData, httpOptions);
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
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.patch(url, songData, httpOptions);
  }
  public deleteSong(songId: string): Observable<Song>{
    const url = `${this.apiUrl}songs/delete/${songId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.delete<Song>(url, httpOptions);
  }
  public getTrack( trackID: string): Observable<Track>{
    const url = `${this.apiUrl}songs/tracks/${trackID}`;
    return this.http.get<Track>(url);
  }
  // public getTrackForName( trackID: string,songID: string){
  //   const url = `${this.apiUrl}songs/tracks/${trackID}`;
  //   return this.http.get(url, trackID);
  // }
  public getTrackFile(trackID: string): Observable<Blob> {
    const url = `${this.apiUrl}songs/tracks/${trackID}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  public getTrackUrl(trackID: string): string {
    const url = `${this.apiUrl}songs/tracks/${trackID}`
    console.log(url);

    return url;
  }
  getTrackBlob(trackID: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}songs/tracks/${trackID}`, { responseType: 'blob' });
  }
  // public getTrackUrl(trackID: string): Observable<string> {
  //   return this.http.get<string>(`${this.apiUrl}/songs/tracks/${trackID}`);
  // }
  public uploadTrack( songID: string, track: File){
    const url = `${this.apiUrl}songs/createTrack`;
    const formData = new FormData();
    if(track){
      formData.append('songID',songID)
      formData.append('track',track)
    }
    return this.http.post(url, formData);
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
