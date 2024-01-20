import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  isFooterHidden: boolean = false;

  ngOnInit() {
    // Initialize the component when it is created
  }

  // HostListener to handle the scroll event
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const currentScroll = window.pageYOffset;

    // Select the 'footer' element in the DOM
    const footerElement = document.querySelector('footer');

    if (footerElement) {
      // Determine whether to hide or show the footer based on scrolling direction
      if (this.prevScroll < currentScroll || currentScroll + window.innerHeight >= document.documentElement.scrollHeight) {
        this.isFooterHidden = false;
      } else {
        this.isFooterHidden = true;
      }
    }

     // Update the previous scroll position for the next comparison
    this.prevScroll = currentScroll;
  }

  // Private property to store the previous scroll position
  private prevScroll: number = 0;
}
