import { Component } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  email: string = ''
  isEmailValid: boolean= true;
  isEmailSent:boolean = false;
  public isLoading: boolean = false;
  public errorMessage: string = '';

  constructor(private resetPasswordService: ResetPasswordService,
    private router: Router){}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  sendEmailResetPassword(){
    console.log(this.isEmailSent)

    if(this.validateEmail(this.email)){
      this.isLoading = true;
      this.isEmailValid = true;
      this.resetPasswordService.sendPaswordLink(this.email)
      .subscribe(
        ()=>{
          this.isEmailSent = true;
          console.log(this.isEmailSent)
          this.isLoading = false;


        }, (error)=> {
          console.error('Error sent email to reset password')
          this.errorMessage = 'Correo no registrado';
          this.isLoading = false;
          setTimeout(() => {
            this.clearErrorMessage();
          }, 3500);
        }
        )

    }else{
      this.isEmailValid = false;
    }
  }
  clearErrorMessage() {
    this.errorMessage = '';
  }

  cancel() {
    // Redirige al usuario a la página de inicio
    this.router.navigate(['/home']);
    this.isLoading = true;
  }
}
