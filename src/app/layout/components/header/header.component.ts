import { NavigationEnd, Router} from '@angular/router';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';
import { SharedUsersService } from 'src/app/core/services/sharedUsers/shared-users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/user';

const apiBaseUrl= environment.apiUrl;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userShared: SharedUsersService,
    public videogamesService: VideogamesService,
    private authService: AuthService,
    private router: Router
    ){}

  user: User | null = null;
  userId: string | null = null;
  loadingData: boolean = true;
  imageUrl!: string;
  isLoggedIn: boolean = false;

  ngOnInit(){
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.user = this.authService.user;
    })
    this.dataUser();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.detectStateRoute();
      }
    })
    this.detectStateRoute();
  }
  currentRouteClass = '';
  detectStateRoute(){
    const currentUrl = this.router.url;
    if(currentUrl.includes('home')){
        this.currentRouteClass = 'nav-big-screen-home';
    }else{
      this.currentRouteClass = 'nav-big-screen-other';
    }
  }
  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout()
  }
  dataUser() {
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (loggedInUserId) {
      this.userId = loggedInUserId;
      this.imageUrl = `${apiBaseUrl}uploads/users/small/`;
      const id = loggedInUserId;
        if (id) {
          this.userShared.getUserById(id).subscribe(data => {
            this.user = data;
            this.loadingData = false;
          });
        } else {
          console.log('error upload data user')
          // this.router.navigate(['/error']);
        }
    }
  }

  optionsVisible = false;
  showOptions(){
    this.optionsVisible = !this.optionsVisible;
  }

  menuVisible = false;
  showMenu(){
    this.menuVisible = !this.menuVisible;
  }
}
