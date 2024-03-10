import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SharedUsersService {

  private URL = environment.apiUrl
  private apiUrl = environment.apiUrl

  $modal = new EventEmitter<any>();
  userData = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los usuarios del backend
  getUsers(): Observable<User> {
    const url = `${this.apiUrl}users`
    const httpOptions = {
      headers: new HttpHeaders ({
        'x-access-token':localStorage.getItem('token') || '',
      })
    }
    return this.http.get<User>(url, httpOptions);
  }

  // Metodo par aobtener los datos del usuario logeado por su ID
  getUser(id: string): Observable<User> {
    const url = `${this.URL}users/${id}`;
    const httpOptions = {
      headers: new HttpHeaders ({
        'x-access-token':localStorage.getItem('token') || '',
      })
    }
    return this.http.get<User>(url, httpOptions);
  }
  // Metodo para emitir los datos del usuario
  sendUserData(user: any): void {
    // Emitir datos del user al componente modal
    this.userData.emit(user);
  }

  // Metodo para actualizar los datos del usuario
  updateUser(id: string, userData: any): Observable<any> {
    const url = `${this.URL}users/update/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':localStorage.getItem('token')|| '',
      })
    }
    return this.http.patch(url, userData, httpOptions);
  }

  // Metodo para actualizar la imagen del usuario
  updateUserImg(id: string,userImg: File): Observable<any> {
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
