import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  private apiUrl = environment.apiUrl



  constructor(private http: HttpClient) { }

  // getGame(page: number, pageSize: number): Observable<Game[]>{
  //   const url= `${this.apiUrl}games/?page=${page}&pageSize=${pageSize}`;
  //   return this.http.get<Game[]>(url).pipe(
  //     tap((games) => {
  //       // console.log('Juegos obtenidos:', games);
  //     })
  //   );
  // }
  getGame(): Observable<Game[]>{
    const url= `${this.apiUrl}games/`;
    return this.http.get<Game[]>(url).pipe(
      tap((games) => {
        // console.log('Juegos obtenidos:', games);
      })
    );
  }
  getGameById(userId: string | null, gameId: string): Observable<Game>{
    const url = `${this.apiUrl}games/${userId}/${gameId}`;
    // console.log('game id S:',gameId, 'user id S:',userId);
    return this.http.get<Game>(url);
  }
  $modal = new EventEmitter<any>();

  createGame(gameData: any, gameImg: File): Observable<any> {
    const url = `${this.apiUrl}games/create`;

    const formData = new FormData();
    formData.append('gameName', gameData.gameName);
    formData.append('platform', gameData.platform);
    formData.append('releaseDate', gameData.releaseDate);
    formData.append('developer', gameData.developer);
    formData.append('genre', gameData.genre);
    formData.append('averageRating', gameData.averageRating);
    formData.append('descriptionGame', gameData.descriptionGame);
    formData.append('gameImg', gameImg);
    // console.log('urlSingUpp', url)
    // console.log('formData service', formData)
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.post(url, formData, httpOptions);
  }

  updateGame(id: string,gameData: any, gameImg: File): Observable<any> {
    const url = `${this.apiUrl}games/update/${id}`;

    const formData = new FormData();
    formData.append('gameName', gameData.gameName);
    formData.append('platform', gameData.platform);
    formData.append('releaseDate', gameData.releaseDate);
    formData.append('developer', gameData.developer);
    formData.append('genre', gameData.genre);
    formData.append('averageRating', gameData.averageRating);
    formData.append('descriptionGame', gameData.descriptionGame);
    if (gameImg) {
      formData.append('gameImg', gameImg);
    }
    console.log('data', gameData.releaseDate, gameData.averageRating)
    // formData.append('gameImg', gameImg);
    // console.log('gameData service', formData)
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token') || '', // Agrega el token al encabezado
      }),
    };
    return this.http.patch(url, formData, httpOptions);
  }

  deleteGame(gameId: string): Observable<any> {
    const url = `${this.apiUrl}games/delete/${gameId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token') || '', // Agrega el token al encabezado
      }),
    };
    return this.http.delete(url, httpOptions);
  }
}
