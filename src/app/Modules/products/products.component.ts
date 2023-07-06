import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private router: Router) { }

  addProduct() {
    this.router.navigate(['/products/add-product']);

  }
  addCategory() {
    this.router.navigate(['/products/add-product-category']);

  }
}
