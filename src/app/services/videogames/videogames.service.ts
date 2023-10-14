import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';
import { enviroment } from 'src/environments/environment.dev';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  private apiUrl = enviroment.apiUrl

  constructor(private http: HttpClient) { }

  getGame(page: number, pageSize: number): Observable<Game[]>{
    const url= `${this.apiUrl}games/?page=${page}&pageSize=${pageSize}`;
    return this.http.get<Game[]>(url).pipe(
      tap((games) => {
        // console.log('Juegos obtenidos:', games);
      })
    );
  }

  getGameById(gameId: string): Observable<Game>{
    const url = `${this.apiUrl}games/${gameId}`;
    console.log('game id S:',gameId)
    return this.http.get<Game>(url);
  }
}
