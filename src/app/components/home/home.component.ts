import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Game } from 'src/app/models/game';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  games: Game[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
  this.loadGameData();
  }

  private loadGameData(){
    this.homeService.getGame().subscribe(data => {
      this.games = data;
      console.log(data);
    });
  }
}
