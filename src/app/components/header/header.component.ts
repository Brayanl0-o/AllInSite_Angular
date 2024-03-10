import { Router, NavigationEnd } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideogamesService } from 'src/app/core/services/videogames/videogames.service';
import { SharedUsersService } from 'src/app/core/services/sharedUsers/shared-users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

const apiBaseUrl= environment.apiUrl;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userShared: SharedUsersService,
    public videogamesService: VideogamesService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute){}

  @Input() user: User | null = null;
  users: User []= [];
  userId: string | null = null;
  loadingData: boolean = true;
  imageUrl!: string;

  ngOnInit(){
    this.dataUser();
  }

  isUserLoggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout()
  }

  dataUser() {
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (loggedInUserId) {
      this.userId = loggedInUserId;
      this.route.paramMap.subscribe(paramMap => {
      this.imageUrl = `${apiBaseUrl}uploads/users/`;

        const id = paramMap.get('id');

        if (id === loggedInUserId) {
          this.userShared.getUser(id).subscribe(data => {
            this.user = data;
            this.loadingData = false;
          });
        } else {
          // this.router.navigate(['/error']);
        }
      });
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
