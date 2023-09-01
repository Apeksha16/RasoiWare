import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  showPersonalInformation: boolean = true;

  toggleComponent() {
    this.showPersonalInformation = !this.showPersonalInformation;
  }

}
