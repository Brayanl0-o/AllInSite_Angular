import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    // Llama a la función del servicio para obtener los datos y muestra en la consola.
    this.homeService.getGame().subscribe(data => {
      console.log(data);
    });
  }
}
