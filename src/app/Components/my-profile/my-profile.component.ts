import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  showPersonalInformation: boolean = true;
  constructor(private router: Router) {}

  toggleInfo(type: string) {
    // this.router.navigate(['/my-profile/manage-addresses']);

    if (type === 'PI') {
      this.showPersonalInformation = true;
    } else {
      this.showPersonalInformation = false;
    }
  }
}
