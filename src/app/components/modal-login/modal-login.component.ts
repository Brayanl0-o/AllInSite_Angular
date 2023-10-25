import { Component, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {
  contactForm!: FormGroup;
  public isLoading: boolean = false;
  public errorMessage: string | null = null;
  constructor(private authService:AuthService,
    private router: Router,
    private readonly fb: FormBuilder,
    private renderer: Renderer2
  ){}

  ngOnInit(){
    // this.subscribeLoggedIn()
    this.contactForm = this.initFrom();
  }

    capsLockOn = false;

    checkCapsLock(event: KeyboardEvent) {
      if(event.getModifierState){
        this.capsLockOn = event.getModifierState('CapsLock');
      } else {
        this.capsLockOn = false;
      }

    }

    login(){
      this.isLoading = true;
      this.errorMessage = null;
        this.authService.login(this.contactForm.value).subscribe(
          (res)=>{
            console.log(res);

            localStorage.setItem('token', res.token);

            const userId = this.authService.getLoggedInUserId();

            if(userId){
              this.router.navigate(['/home',userId])
            }else{
              console.log('No id found')
            }
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
            this.errorMessage = ' Usuario o contraseña incorrectos'; // Asignar mensaje de error
            this.isLoading = false;

            setTimeout(() => {
              this.errorMessage = null;
            }, 2000);
          })
    }

    isUserLoggedIn() {
      return this.authService.loggedIn();
    }

    initFrom(): FormGroup {
      return this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }

    modalIsVisible = false;
    showModal(){
      this.modalIsVisible = !this.modalIsVisible;
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
    closeModal(){
      this.modalIsVisible = false;
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
