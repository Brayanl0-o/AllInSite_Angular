import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Game } from 'src/app/models/game';
import { SliderGamesComponent } from 'src/app/components/slider-games/slider-games.component';
import { SliderGamesInterface } from 'src/app/models/slider-games';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  slides: SliderGamesInterface[]= [
    {url: '../../../assets/img/dantes.jpg',title:'ejemplo'},
    {url: '../../../assets/img/shadow2.jpg',title:'ejemplo'},
    {url: '../../../assets/img/half_life_2-black-whit.jpeg',title:'ejemplo'},
    {url: '../../../assets/img/Mafia1.jpg',title:'ejemplo'},
    {url: '../../../assets/img/halo.jpg',title:'ejemplo'},
    {url: '../../../assets/img/madison.png',title:'ejemplo'},
    {url: '../../../assets/img/shadow.jpg',title:'ejemplo'},
    {url: '../../../assets/img/half_life_3.jpeg',title:'ejemplo'},
  ];
  constructor(
    // private homeService: HomeService,
    // private filterService: FilterService
  ) {}

  ngOnInit(): void {

  }



}
