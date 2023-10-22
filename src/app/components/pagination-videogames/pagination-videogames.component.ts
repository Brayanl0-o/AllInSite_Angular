import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination-videogames',
  templateUrl: './pagination-videogames.component.html',
  styleUrls: ['./pagination-videogames.component.css']
})
export class PaginationVideogamesComponent {
 // currentPage = 1; // Página actual
  // pageSize = 9;  // Juegos por página
  // totalGames = 13;// Total de juegos (necesario para la paginación)
  // totalPages: number = 2;
  // pages!:  number[];

  ngOnInit(): void {
    // this.loadGameData(this.currentPage, this.pageSize);
    // console.log('loadGameDatareceived in HomeComponent:', this.loadGameData);
    // this.pagination()

  }

  // private loadGameData(page: number, pageSize: number) {
  //   // console.log('Loading game data for page', page);
  //   this.videogamesService.getGame(page, pageSize).subscribe((response: any) => {
  //     //  console.log('Game data response:', response);
  //     this.loadingData = false;
  //     this.games = response.games; // Asigna la matriz de juegos desde la respuesta de la API
  //     this.totalGames = response.totalGames; // Actualiza el total de juegos
  //     // this.currentPage = response.currentPage; // Actualiza la página actual
  //     this.filteredGames = [...this.games];
  //     // console.log('dataload', response.games);
  //   });
  // }

   // pagination(){
  //   this.currentPage = 1; // Establece la página inicial
  //   this.pageSize = 9; // Establece el tamaño de página deseado

  //   // Obtener el número total de juegos desde tu servicio o donde sea que lo obtengas
  //   this.videogamesService.getGame(this.currentPage, this.pageSize).subscribe((response: any) => {
  //     this.games = response.games;
  //     this.totalGames = response.totalGames;

  //     // Verifica si totalGames y pageSize son valores válidos antes de calcular totalPages
  //     if (this.totalGames && this.pageSize) {
  //       // Calcular totalPages
  //       this.totalPages = Math.ceil(this.totalGames / this.pageSize);
  //     }
  //     if(this.totalPages !== undefined){
  //       // Crea un array de números de página desde 1 hasta totalPages
  //       this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  //       // console.log('currentPage', this.currentPage,'totalPages', this.totalPages,'pages', this.pages);
  //     }
  //   });
  // }

  // // Función para cambiar de página
  // onPageChange(page: number) {
  //   this.currentPage = page;
  //   this.loadGameData(page, this.pageSize);
  // }

  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.loadGameData(this.currentPage, this.pageSize);
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.loadGameData(this.currentPage, this.pageSize);
  //   }
  // }

  // goToPage(page: number) {
  //   if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
  //     this.currentPage = page;
  //     this.loadGameData(this.currentPage, this.pageSize);
  //   }
  // }

}
