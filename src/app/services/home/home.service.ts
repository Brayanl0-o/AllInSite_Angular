import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  // getGame(): Observable<Game[]>{
  //   const url= `${this.apiUrl}games/`;
  //   return this.http.get<Game[]>(url).pipe(
  //     tap((games) => {
  //       console.log('Juegos obtenidos:', games);
  //     })
  //   );

  // }
}

