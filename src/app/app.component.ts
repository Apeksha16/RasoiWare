import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'responsiveRasoiware';

  selectedValue: string = 'All Categories';

  onDropdownChange(event: any) {
    console.log(event);
    this.selectedValue = event;
  }
}
