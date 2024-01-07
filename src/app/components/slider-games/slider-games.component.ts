import { Component, OnInit, Input } from '@angular/core';
import { SliderGamesInterface } from 'src/app/models/slider-games';

@Component({
  selector: 'app-slider-games',
  templateUrl: './slider-games.component.html',
  styleUrls: ['./slider-games.component.css']
})
export class SliderGamesComponent {

    // @Input() slides:SliderGamesInterface[] =[];
    slides: SliderGamesInterface[]= [
      {url: '../../../assets/img/slider-home/videogames2.webp',title:'videogames2'},
      {url: '../../../assets/img/slider-home/dantes.webp',title:'dantes'},
      {url: '../../../assets/img/slider-home/shadow2.webp',title:'shadow2'},
      {url: '../../../assets/img/slider-home/half_life_2-black-whit.webp',title:'half life 2'},
      {url: '../../../assets/img/slider-home/Mafia1.webp',title:'Mafia1'},
      {url: '../../../assets/img/slider-home/halo.webp',title:'halo'},
      {url: '../../../assets/img/slider-home/madison.webp',title:'madison'},
      {url: '../../../assets/img/slider-home/shadow.webp',title:'shadow'},
      {url: '../../../assets/img/slider-home/half_life_3.webp',title:'half life 3'},
      {url: '../../../assets/img/slider-home/videogames.webp',title:'videogames'},

    ];
    // imagesLoaded = 0;
    // imagesReady = false;
    // handleImageLoad() {
    //   this.imagesLoaded++;

    //   // Verificar si todas las imágenes están cargadas antes de iniciar la animación
    //   if (this.imagesLoaded === this.slides.length) {
    //     // Todas las imágenes están cargadas, ahora puedes iniciar la animación
    //     // Por ejemplo, puedes configurar una bandera para indicar que las imágenes están listas.
    //     this.imagesReady = true;
    //   }
    // }

    currentIndex:number = 0;
    interval:any;

    ngOnInit(): void {
      this.startAutoPlay();
    }

    startAutoPlay() {
      this.interval = setInterval(() => {
        this.goToNext();
      }, 6000); // Cambia la diapositiva cada 5 segundos (ajusta el tiempo según tus necesidades)
    }

    stopAutoPlay() {
      clearInterval(this.interval);
    }

  goToNext(): void{
    const isLastSlide = this.currentIndex === this.slides.length -1
    const newIndex = isLastSlide ? 0: this.currentIndex +1;
    this.currentIndex = newIndex
  }

  goToPrevius():void{
    const isFirstSlide = this.currentIndex ===0;
    const newIndex = isFirstSlide
    ? this.slides.length -1
    :this.currentIndex -1;
    this.currentIndex = newIndex
  }

  goToSlide(slideIndex: number): void{
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl():string{
    return `url('${this.slides[this.currentIndex].url}')`;
  }

}

