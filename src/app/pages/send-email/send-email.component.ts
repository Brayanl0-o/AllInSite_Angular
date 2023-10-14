import { Component } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  email: string = ''
  isEmailValid: boolean= true;
  isEmailSent:boolean = false;

  constructor(private resetPasswordService: ResetPasswordService){}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  sendEmailResetPassword(){
    console.log(this.isEmailSent)
    if(this.validateEmail(this.email)){
      this.isEmailValid = true;
      this.resetPasswordService.sendPaswordLink(this.email)
      .subscribe(
        ()=>{
          this.isEmailSent = true;
          console.log(this.isEmailSent)


        }, (error)=> {
          console.error('Error sent email to reset password')
        }
        )
    }else{
      this.isEmailValid = false;
    }
  }

}
