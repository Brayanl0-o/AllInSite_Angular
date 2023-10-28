import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        console.log('Juegos obtenidos:', games);
      })
    );
  }
  getGameById(userId: string | null, gameId: string): Observable<Game>{
    const url = `${this.apiUrl}games/${userId}/${gameId}`;
    console.log('game id S:',gameId)
    console.log('user id S:',userId)
    return this.http.get<Game>(url);
  }
  $modal = new EventEmitter<any>();

  createGame(gameData: any, gameImg: File): Observable<any> {
    const url = `${this.apiUrl}games/create`;

    // Crea un objeto FormData para enviar tanto los datos del juego como la imagen
    const formData = new FormData();
    formData.append('gameName', gameData.gameName);
    formData.append('platform', gameData.platform);
    formData.append('releaseDate', gameData.releaseDate);
    formData.append('developer', gameData.developer);
    formData.append('genre', gameData.genre);
    formData.append('averageRating', gameData.averageRating);
    formData.append('descriptionGame', gameData.descriptionGame);
    formData.append('gameImg', gameImg);

    return this.http.post(url, formData);
  }

  updateGame(id: string,gameData: any): Observable<any> {
    const url = `${this.apiUrl}games/update/${id}`;
    console.log('gameData service', gameData)
    return this.http.put(url, gameData);
  }

  deleteGame(gameId: string): Observable<any> {
    const url = `${this.apiUrl}games/delete/${gameId}`;
    return this.http.delete(url);
  }
}
