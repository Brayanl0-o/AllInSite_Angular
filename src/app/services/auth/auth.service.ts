import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, tap, throwError, BehaviorSubject } from 'rxjs';
import { enviroment } from 'src/environments/environment.dev';
import { User } from 'src/app/models/user';


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

  public login(user: any) {
    return this.http.post<any>(this.URL + 'auth/login', user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token)
        // Añadir esta línea para indicar que el usuario ha iniciado sesión
        this.isLoggedIn$.next(true);
      })
    )

  }

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = new Date(payload.exp * 1000); // Convierte el tiempo de expiración a una fecha
      const now = new Date();
      return now < expiration; // Devuelve verdadero si el token no ha caducado
    }
    return false; // Devuelve falso si no hay token o ha caducado
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/home'])
  }
  /// Obtener el Id del usuario logeado desde el token almacenado
  getLoggedInUserId(): string | null {
    const token = this.gettoken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.id) {
        return payload.id;
      }
      console.log('carga U: ', payload)
    }
    return null;
  }

  getUserById(userId: string): Observable<User> {
    // Realiza una solicitud al servidor para obtener la información del usuario por su ID
    return this.http.get<User>(`${this.URL}users/${userId}`);
  }

}
