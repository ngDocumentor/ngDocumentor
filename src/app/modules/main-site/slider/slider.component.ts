import { Component, AfterViewInit } from '@angular/core';
import { HttpService } from '../../../commons/services/http/http.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit {

  slideIndex = 1;

  constructor(public _h: HttpService) { }

  /**
   *
   *
   * @param {*} n
   * @memberof SliderComponent
   */
  plusSlides(n): void {
    this.showSlides(this.slideIndex += n);
  }

  /**
   *
   *
   * @param {*} n
   * @memberof SliderComponent
   */
  currentSlide(n): void {
    this.showSlides(this.slideIndex = n);
  }

  /**
   * Refactor or change later. Taken from a snippet for faster implementation
   *
   * @param {*} n
   * @memberof SliderComponent
   */
  showSlides(n): void {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style', 'display:none');
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    //console.log(slides, slides[this.slideIndex - 1])
    slides[this.slideIndex - 1].setAttribute('style', 'display:block');
    dots[this.slideIndex - 1].className += ' active';
  }

  /**
   * Initialise slides
   *
   * @memberof SliderComponent
   */
  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

}
