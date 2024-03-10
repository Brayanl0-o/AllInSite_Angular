import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SharedUsersService } from 'src/app/core/services/sharedUsers/shared-users.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  constructor(
    private userShared:SharedUsersService,
    private authService: AuthService,
    private route: ActivatedRoute){
    }

  // Decorator for using interfaz user
  @Input() user: User | null = null;
  userId: string | null = null;

  ngOnInit(){
    // Initialize the data user
    this.dataUser();
  }

  isUserLoggedIn(){
    // Get the user logged-in from the authentication service
    return this.authService.loggedIn();
  }

  dataUser() {
    // Get the Id of the logged-in user from the authentication service
    const loggedInUserId = this.authService.getLoggedInUserId();

    if (loggedInUserId) {
      // Asign the obtained userId to the component's userId
      this.userId = loggedInUserId;
      // Subscribe to changes in Url parameters
      this.route.paramMap.subscribe(paramMap => {

        // Get the user Id from the Url
        const id = paramMap.get('id');

        // Check if the Url user Id matches the logged-in user
        if (id === loggedInUserId) {
          // Retrieve user data using the userShared service
          this.userShared.getUser(id).subscribe(data => {
            // Assign the user data to the 'user' variable
            this.user = data;
            // console.log('Data User prfile', data)
          });
        } else {
          // If the IDs are different, log an error
          console.error('Error: Different or mismatching IDs');
          // You may also redirect the user to an error page if necessary
          // this.router.navigate(['/error']);
        }
      });
    }
  }
}
