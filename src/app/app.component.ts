import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RasoiWare';
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  selectedValue: string = 'All Categories';
  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  constructor(config: NgbDropdownConfig) {}

  onDropdownChange(event: any) {
    console.log(event);
    this.selectedValue = event;
  }
}
