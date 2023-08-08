import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  category: string[] = [
    'Appliances',
    'Cookware',
    'Coffee Machines',
    'Mixer Grinder',
    'Drinkware',
    'Flask & Bottles',
    'Home & Living',
    'Cookers',
    'Cooktops',
    'Chimneys',
    'Kitchen Tools',
    'Gifting',
    'Spares',
  ];
}
