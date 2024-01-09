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
  private apiUrl = environment.apiUrl

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
    return this.http.patch(url, userData);
  }


  updateUserImg(id: string,userData: any, userImg: File): Observable<any> {
    const url = `${this.URL}users/updateImg/${id}`;
    console.log('url service updateUser Img', url)
    const formData = new FormData();
    if (userImg) {
      // Si gameImg es diferente de null, agrega la nueva imagen al formData.
      formData.append('userImg', userImg);
    }
    formData.append('gameName', userData.gameName);
    formData.append('platform', userData.platform);
    formData.append('releaseDate', userData.releaseDate);
    formData.append('developer', userData.developer);
    formData.append('genre', userData.genre);
    formData.append('averageRating', userData.averageRating);
    formData.append('descriptionGame', userData.descriptionGame);
    console.log('userData service', formData)
    return this.http.patch(url, formData);
  }

}
