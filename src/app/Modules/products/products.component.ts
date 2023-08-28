import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  productColumns: string[] = [
    'img',
    'name',
    'id',
    'stock',
    'category',
    'brand',
  ];
  productTableData: any;
  searchProduct: string = '';
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private router: Router, private productService: ProductsService) {
    this.fetchProducts();
    this.fetchDash();
  }

  fetchDash() {
    // this.productService.onUpdateActiveProductCount();
  }

  fetchProducts() {
    this.productService.fetchAllProducts().then((res) => {
      this.productTableData = new MatTableDataSource(res);
      this.productTableData.paginator = this.paginator;
      // console.log(this.productTableData);
    });
  }

  editProduct(id: string) {
    this.router.navigate(['/products/edit-product', id]);
  }

  addProduct() {
    this.router.navigate(['/products/add-product']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productTableData.filter = filterValue.trim().toLowerCase();
  }
}
