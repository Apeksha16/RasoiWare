import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardCards: any[] = [];

  ngOnInit() {
    this.dashboardCards = [{
      heading: 'Active Products',
      iconColor: '9b5de5',
      value: 0,
      icon: 'inventory_2'
    }, {
      heading: 'No. of Users',
      iconColor: 'fee440',
      value: 357,
      icon: 'group'
    }, {
      heading: 'Threshold Products',
      iconColor: 'ee6c4d',
      value: 72,
      icon: 'trending_down'
    }, {
      heading: "Today's Orders",
      iconColor: '219ebc',
      value: 108,
      icon: 'list_alt'
    }];
    const interval = setInterval(() => {
      this.dashboardCards[0].value = this.dashboardCards[0].value + 1;
      if (this.dashboardCards[0].value >= 793) {
        clearInterval(interval);
      }
    },1)
  }
}
