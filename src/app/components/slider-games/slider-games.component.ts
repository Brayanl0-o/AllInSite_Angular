import { Component, OnInit, Input } from '@angular/core';
import { SliderGamesInterface } from 'src/app/models/slider-games';

@Component({
  selector: 'app-slider-games',
  templateUrl: './slider-games.component.html',
  styleUrls: ['./slider-games.component.css']
})
export class SliderGamesComponent {

    @Input() slides:SliderGamesInterface[] =[];


    currentIndex:number = 0;
    interval:any;

    ngOnInit(): void {
      this.startAutoPlay();
    }

    startAutoPlay() {
      this.interval = setInterval(() => {
        this.goToNext();
      }, 5000); // Cambia la diapositiva cada 5 segundos (ajusta el tiempo según tus necesidades)
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

