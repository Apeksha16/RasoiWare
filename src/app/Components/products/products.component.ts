import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FireService } from 'src/app/Services/fire.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  brandList: any = [];
  mostSellingProducts: any[] = [];

  constructor(
    private fire: FireService,
    private data:DataService
  ){}

  ngOnInit() {
    this.fetchAllBrands();
    this.fetchMostSellingProducts();
  }

  fetchAllBrands() {
    this.fire.getAllBrands().then((res) => {
      this.brandList = res;
  })
  }

  fetchMostSellingProducts() {
    this.fire.getTypeOfProducts('isMostSelling', 6).then((res) => {
      if (Array.isArray(res)) {
        this.mostSellingProducts = this.fire.transformProdResponse(res);
        // this.mostSellingProducts = [...this.mostSellingProducts, ...this.mostSellingProducts];
      }
    })
  }
}
