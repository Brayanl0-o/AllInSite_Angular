import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { VideogamesService } from 'src/app/services/videogames/videogames.service';
import { Game } from 'src/app/models/game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent {
  gameDetails$: Observable<Game>;
  gameId: string | null = null;

  constructor(private videogameService: VideogamesService, private route: ActivatedRoute) {
    this.gameDetails$ = new Observable<Game>();
  }

  ngOnInit() {
    this.loadDataGame();
  }

  loadDataGame(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.gameId = params.get('id');
      if (this.gameId) {
        console.log('user id:',this.gameId)
        this.gameDetails$ = this.videogameService.getGameById(this.gameId);
      }
    });
  }
}
