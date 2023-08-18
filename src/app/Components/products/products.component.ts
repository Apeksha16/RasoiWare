import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  brandList: string[] = [
    'Wonderchef',
    'Amazon',
    'Flipkart',
    'Kitchenware',
    'Pigeon',
    'Borosil',
    'Flipkart',
    'Kitchenware',
    'Amazon',
  ];
}
