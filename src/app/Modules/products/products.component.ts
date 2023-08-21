import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  productColumns: string[] = ['name', 'id', 'stock', 'category', 'brand'];
  productTableData: any;

  constructor(private router: Router, private productService: ProductsService) {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.fetchAllProducts().then((res) => {
      this.productTableData = new MatTableDataSource(res);
    });
  }
  editProduct(id: string) {
    this.router.navigate(['/products/edit-product', id]);
  }

  addProduct() {
    this.router.navigate(['/products/add-product']);
  }
}
