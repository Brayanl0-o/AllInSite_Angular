import { Component } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {
  showModalWarning:boolean = false;

  ngOnInit() {
    const lastVisited = localStorage.getItem('lastVisited');
    if (!lastVisited || (Date.now() - parseInt(lastVisited, 10) > 300000)) {
        this.showModalWarning= true;
        localStorage.setItem('lastVisited', Date.now().toString());
    }
  }

  toggleModalWarning(){
    this.showModalWarning = !this.showModalWarning;
  }
}
