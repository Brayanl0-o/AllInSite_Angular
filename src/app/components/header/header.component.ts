import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    optionsVisible = false;

    showOptions(){
      this.optionsVisible = !this.optionsVisible;
    }

    menuVisible = false;

    showMenu(){
      this.menuVisible = !this.menuVisible;
    }

}
