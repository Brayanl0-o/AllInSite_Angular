import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
   private URL = environment.apiUrl

  constructor(private http:HttpClient) { }


  sendPaswordLink(email:string):Observable<any>{
    const sendPasswordLinkUrl=`${this.URL}auth/send-password-link`;

    const requestBody = {
      email:email

    };
    // console.log(email)
    return this.http.post(sendPasswordLinkUrl, requestBody);
  }

  private getHttpOptions(token: string): { headers: HttpHeaders } {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token, // Agrega el token al encabezado
      }),
    };

    return httpOptions;
  }
  changePassword(password: string, token: string): Observable<any> {
    const url = `${this.URL}auth/change-password`;

    const httpOptions = this.getHttpOptions(token);

    const requestBody = {
      password: password,
    };

    return this.http.post(url, requestBody, httpOptions);
  }



}
