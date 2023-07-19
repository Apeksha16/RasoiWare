import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() images: string[] = [];
  currentIndex = 0;
  nextIndex = 1;
  previousIndex = this.images.length - 1;

  ngOnInit() {
    setInterval(() => {
      this.showNextImage();
    }, 5000); // Change image every 5 seconds (you can adjust the duration)
  }

  showNextImage() {
    this.currentIndex = this.nextIndex;
    this.nextIndex = (this.nextIndex + 1) % this.images.length;
    this.previousIndex =
      (this.currentIndex + this.images.length - 1) % this.images.length;
  }

  showPreviousImage() {
    this.currentIndex = this.previousIndex;
    this.previousIndex =
      (this.previousIndex + this.images.length - 1) % this.images.length;
    this.nextIndex = (this.currentIndex + 1) % this.images.length;
  }
}
