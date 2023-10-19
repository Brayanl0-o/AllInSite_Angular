import { HttpClient } from '@angular/common/http';
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

  $modal = new EventEmitter<any>();
  userData = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los usuarios del backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  // Metodo par aobtener los datos del usuario logeado por su ID
  getUser(id: string): Observable<User> {
    const url = `${this.URL}users/${id}`;
    // console.log('Requesting user data from:', url);
    return this.http.get<User>(url);
  }

  sendUserData(user: any): void {
    // Emitir datos del user al componente modal
    this.userData.emit(user);
    // console.log('dataUser switchService: ', user)
  }

  updateUser(id: string, userData: any): Observable<any> {
    const url = `${this.URL}users/update/${id}`;
    console.log('userData service', userData)
    return this.http.put(url, userData);
  }
}
