import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = enviroment.apiUrl

  constructor(
    private http: HttpClient,
    private router: Router) { }

  // Almacena el token
  gettoken() {
    return localStorage.getItem('token')
  }

  //Logueor, registro & cerrar sesión
  public signUp(user: any): Observable<any> {
    return this.http.post<any>(this.URL + 'auth/signup', user)
      .pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud de registro:', error);
          return throwError(error); // Puedes lanzar un error personalizado aquí si es necesario.
        })
      );
  }

  public signIn(user: any) {
    return this.http.post<any>(this.URL + 'auth/login', user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token)
      })
    )
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  /// Obtener el Id del usuario logeado desde el token almacenado
  getLoggedInUserId(): string | null {
    const token = this.gettoken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.id) {
        return payload.id;
      }

    }
    return null;
  }

  getUserById(userId: string): Observable<User> {
    // Realiza una solicitud al servidor para obtener la información del usuario por su ID
    return this.http.get<User>(`${this.URL}users/${userId}`);
  }
}
