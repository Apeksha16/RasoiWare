import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent {
  products = [
    { id: 1, name: 'Product A', category: 'Category A', price: 2500, originalPrice: 3200, image: 'assets/prd.jpeg' },
    { id: 2, name: 'Product B', category: 'Category B', price: 2200, originalPrice: 2800, image: 'assets/prd.jpeg' },
    { id: 3, name: 'Product C', category: 'Category A', price: 1800, originalPrice: 2400, image: 'assets/prd.jpeg' },
    { id: 1, name: 'Product A', category: 'Category A', price: 2500, originalPrice: 3200, image: 'assets/prd.jpeg' },
    { id: 2, name: 'Product B', category: 'Category B', price: 2200, originalPrice: 2800, image: 'assets/prd.jpeg' },
    { id: 3, name: 'Product C', category: 'Category A', price: 1800, originalPrice: 2400, image: 'assets/prd.jpeg' },
    { id: 1, name: 'Product A', category: 'Category A', price: 2500, originalPrice: 3200, image: 'assets/prd.jpeg' },
    { id: 2, name: 'Product B', category: 'Category B', price: 2200, originalPrice: 2800, image: 'assets/prd.jpeg' },
    { id: 3, name: 'Product C', category: 'Category A', price: 1800, originalPrice: 2400, image: 'assets/prd.jpeg' },
    { id: 1, name: 'Product A', category: 'Category A', price: 2500, originalPrice: 3200, image: 'assets/prd.jpeg' },
    { id: 2, name: 'Product B', category: 'Category B', price: 2200, originalPrice: 2800, image: 'assets/prd.jpeg' },
    { id: 3, name: 'Product C', category: 'Category A', price: 1800, originalPrice: 2400, image: 'assets/prd.jpeg' },
  ];
  activeIds: string[] = []; 

}
