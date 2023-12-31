import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, tap, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
    private router: Router) { }


  gettoken() {
    return localStorage.getItem('token')
  }

  public signUp(userData: any, userImg:any): Observable<any> {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('password', userData.password);
    formData.append('years', userData.years);
    formData.append('country', userData.country);

    if (userImg) {
        formData.append('userImg', userImg);
    }

    // const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.post(this.apiUrl + 'auth/signup', formData, { observe: 'response' }).pipe(
      catchError((error: any) => {
        // console.error('Error en la solicitud(servicio) de registro signUp: ', error);
        return throwError(error);
      })
    );;
  }

  public login(user: any) {
    return this.http.post<any>(this.apiUrl + 'auth/login', user).pipe(
      tap((response) => {
        // console.log('Respuesta del servidor:', response);
        const token = response.token;
        console.log('Contenido del payload del token decodificado:', atob(token.split('.')[1]));

        localStorage.setItem('token', response.token)

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
      return now < expiration;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/home'])
  }

  getLoggedInUserId(): string | null {
    const token = this.gettoken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.id) {
        return payload.id;
      }
    }
    return 'null';
  }

  getLoggedUserRole(): string {
    const token = this.gettoken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.roles) {
        return payload.roles;
      }
    }
    return 'null';
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${userId}`);
  }

}

  // //Logueor, registro & cerrar sesión
  // public signUpU(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + 'auth/signup', user)
  //     .pipe(
  //       catchError((error: any) => {
  //         console.error('Error en la solicitud de registro:', error);
  //         return throwError(error);
  //       })
  //     );
  // }
