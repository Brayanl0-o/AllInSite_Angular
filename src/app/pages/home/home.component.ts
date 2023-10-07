import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(
    private homeService: HomeService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {

  }



}
