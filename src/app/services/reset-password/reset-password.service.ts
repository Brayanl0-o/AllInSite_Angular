import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
   private URL = enviroment.apiUrl

  constructor(private http:HttpClient) { }


  sendPaswordLink(email:string):Observable<any>{
    const sendPasswordLinkUrl=`${this.URL}auth/send-password-link`;

    const requestBody = {
      email:email

    };
    // console.log(email)
    return this.http.post(sendPasswordLinkUrl, requestBody);
  }




}
