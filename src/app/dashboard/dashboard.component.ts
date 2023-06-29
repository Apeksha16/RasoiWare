import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userValue: string = '';
  firstLetter: string = '';

  constructor(private router: Router) {
    this.userValue = localStorage.getItem('adminName') || '';
    this.firstLetter = this.userValue.charAt(0);

  }
}