import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GameRequirements } from '../../models/game';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  private apiUrl = environment.apiUrl
  $modal = new EventEmitter<any>();


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
    return this.http.get<Game[]>(url)
  }
  getGameById(userId: string | null, gameId: string): Observable<Game>{
    const url = `${this.apiUrl}games/${userId}/${gameId}`;
    return this.http.get<Game>(url);
  }

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
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.post(url, formData, httpOptions);
  }

  getRequirementesById(gameId:string){
    const  url = `${this.apiUrl}games/gameRequirementsById/${gameId}`
    return this.http.get<GameRequirements>(url);
  }

  updateRequirements(gameRequeriments: GameRequirements): Observable<any>{
    const url = `${this.apiUrl}games/createRequirements`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token') || '',
      })
    }
    return this.http.post(url, gameRequeriments)
  }

  updateGame(id: string,gameData: any): Observable<any> {
    const url = `${this.apiUrl}games/update/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token') || '', // Agrega el token al encabezado
      }),
    };
    return this.http.patch(url, gameData, httpOptions);
  }

  updatedGameImg(id:string, gameImg: File){
    const url = `${this.apiUrl}games/updatedGameImg/${id}`;
    const formData = new FormData()
    if(gameImg){
      formData.append('gameImg', gameImg)
    }
    const httpOptions = {
      headers:new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.patch(url,formData,httpOptions).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    );
  }

  // gameData = new EventEmitter<any>();
  // sendGameData(game: any): void {
  //   // Emitir datos del user al componente modal
  //   this.gameData.emit(game);
  //   // console.log('datagame switchService: ', game)
  // }

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
