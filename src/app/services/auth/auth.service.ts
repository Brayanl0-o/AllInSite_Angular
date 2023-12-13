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

  // Almacena el token
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


  //Logueor, registro & cerrar sesión
  public signUpU(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'auth/signup', user)
      .pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud de registro:', error);
          return throwError(error);
        })
      );
  }
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  public login(user: any) {
    return this.http.post<any>(this.apiUrl + 'auth/login', user).pipe(
      tap((response) => {
        console.log('Respuesta del servidor:', response);

        const token = response.token;
        // Decodificar y mostrar el contenido del token
        const decodedToken = this.decodeToken(token);
        console.log('Contenido del payload del token decodificado:', atob(token.split('.')[1]));

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
    return 'null';
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${userId}`);
  }

}
  // getLoggedInUserRole(): string {
  //   const token = this.gettoken();
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split('.')[1]));

  //     if (payload.role) {
  //       // Suponemos que solo hay un objeto en el arreglo "admin"
  //       return payload.role;
  //     }
  //   }
  //   return this.getLoggedInUserRole();
  // }
