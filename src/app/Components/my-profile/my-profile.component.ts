import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  showPersonalInformation: boolean = true;

  toggleInfo(type: string) {
    if (type === 'PI') {
      this.showPersonalInformation = true;
    } else {
      this.showPersonalInformation = false;
    }
  }
}
