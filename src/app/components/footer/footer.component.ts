import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  ngOnInit(){
    this.scrollListener();
  }

  scrollListener(){
    let prevScroll = window.pageYOffset;


    window.onscroll =  () => {
      const currentScroll = window.pageYOffset;

      const footerElement = document.querySelector('footer');

      if (footerElement) {
        if (prevScroll < currentScroll || currentScroll + window.innerHeight >= document.documentElement.scrollHeight) {
          footerElement.classList.remove('footer-hidden');
        } else {
          footerElement.classList.add('footer-hidden');
        }
      }
      prevScroll = currentScroll;
    }
  }
}
