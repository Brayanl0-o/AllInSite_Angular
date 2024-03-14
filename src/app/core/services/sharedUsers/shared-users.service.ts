import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SharedUsersService {

  private URL = environment.apiUrl
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  $modal = new EventEmitter<any>();
  userData = new EventEmitter<any>();
  // Metodo para obtener todos los usuarios del backend
  public getUsers(): Observable<User> {
    const url = `${this.apiUrl}users`
    const httpOptions = {
      headers: new HttpHeaders ({
        'x-access-token':localStorage.getItem('token') || '',
      })
    }
    return this.http.get<User>(url, httpOptions);
  }

  // Metodo par aobtener los datos del usuario logeado por su ID
  public getUser(id: string): Observable<User> {
    const url = `${this.URL}users/${id}`;
    const httpOptions = {
      headers: new HttpHeaders ({
        'x-access-token':localStorage.getItem('token') || '',
      })
    }
    return this.http.get<User>(url, httpOptions);
  }

  // Metodo para emitir los datos del usuario
  public sendUserData(user: any): void {
    // Emitir datos del user al componente modal
    this.userData.emit(user);
  }

  // Metodo para actualizar los datos del usuario
  public updateUser(id: string, userData: any): Observable<any> {
    const url = `${this.URL}users/update/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.patch(url, userData, httpOptions);
  }

  // Metodo para actualizar la imagen del usuario
  public updateUserImg(id: string,userImg: File): Observable<any> {
    const url = `${this.URL}users/updateImg/${id}`;
    const formData = new FormData();
    if (userImg) {
      // Si gameImg es diferente de null, agrega la nueva imagen al formData.
      formData.append('userImg', userImg);
    }
    const httpOptions = {
      headers:new HttpHeaders({
        'x-access-token': localStorage.getItem('token') || '',
      })
    }
    return this.http.patch(url, formData, httpOptions);
  }
}
