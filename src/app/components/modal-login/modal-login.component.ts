import { Component, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {
  constructor(private authService:AuthService,
    private router: Router,
    private readonly fb: FormBuilder,
    private renderer: Renderer2,
    public auth: AngularFireAuth){}


  contactForm!: FormGroup;
  public isLoading: boolean = false;
  public errorMessage: string | null = null;


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

    public isPasswordVisible: boolean = false;
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    }

    isTextOrPassword() {
      return this.isPasswordVisible ? 'text' : 'password';
    }

    login(){
      this.isLoading = true;
      this.errorMessage = null;
        this.authService.login(this.contactForm.value).subscribe(
          (res)=>{
            // console.log(res);
            localStorage.setItem('token', res.token);

            const userId = this.authService.getLoggedInUserId();

            if(userId){
              this.router.navigate(['/home',userId])
              this.renderer.removeStyle(document.body, 'overflow');
            }else{
              console.error('No id found')
            }
            this.isLoading = false;
          },
          (err) => {
            console.error(err);
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
  // signInWithGoogle() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   this.auth.signInWithPopup(provider)
  //     .then((result) => {
  //       console.log('Usuario autenticado:', result.user);

  //       // Obtener el token de Firebase
  //       result.user?.getIdToken().then((token) => {
  //         console.log('Token de Firebase:', token);

  //         // Enviar el token de Firebase al backend
  //         this.authService.sendTokenToBackend(token).subscribe(
  //           (response) => {

  //             console.log('Token enviado correctamente:', response);
  //           },
  //           (error) => {
  //             console.error('Error al enviar el token:', error);
  //           }
  //         );
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error al autenticar:', error);
  //     });
  // }

  // signOut(){
  //   this.authService.signOut().then(()=> {
  //     console.log('logged out!');
  //   }).catch(error => {
  //     console.error('error to login:', error)
  //   })
  // }
