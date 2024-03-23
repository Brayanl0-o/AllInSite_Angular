import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Game, GameRequirements } from '../../models/game';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }


  $modal = new EventEmitter<any>();


  public getGame(): Observable<Game[]>{
    const url= `${this.apiUrl}games/`;
    return this.http.get<Game[]>(url)
  }

  public getGameById(userId: string | null, gameId: string): Observable<Game>{
    const url = `${this.apiUrl}games/${userId}/${gameId}`;
    return this.http.get<Game>(url);
  }

  public createGame(gameData: any, gameImg: File): Observable<any> {
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
    formData.append('gameTrailer', gameData.gameTrailer);

    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.post(url, formData, httpOptions);
  }

  public getRequirementesById(gameId:string){
    const  url = `${this.apiUrl}games/gameRequirementsById/${gameId}`
    return this.http.get<GameRequirements[]>(url).pipe(
      map(requirements => requirements.length > 0 ? requirements[0] : null)
    );
  }

  public updateRequirements(gameRequeriments: GameRequirements): Observable<any>{
    const url = `${this.apiUrl}games/createRequirements`;
    return this.http.post(url, gameRequeriments)
  }

  public updateGame(id: string,gameData: any): Observable<any> {
    const url = `${this.apiUrl}games/update/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token') || '',
      }),
    };
    return this.http.patch(url, gameData, httpOptions);
  }

  public updatedGameImg(id:string, gameImg: File){
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

  public deleteGame(gameId: string): Observable<any> {
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

