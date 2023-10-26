import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { FireService } from 'src/app/Services/fire.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css'],
})
export class PopularProductsComponent {
  products :any[] = [];
  activeIds: string[] = [];
  coverImage: string = '';
  activeCategory: string = '';
  filters: any;
  webFilters: any;

  constructor(
    private fire: FireService,
    private actvRoute: ActivatedRoute,
    private data:DataService
  ) {
    this.getActiveCategory();
    this.getCategoryData();
    this.getProducts();
 }

  async getActiveCategory() {
    await this.actvRoute.params.subscribe((x: any) => {
      this.activeCategory = x.category;
    });
  }

  async getCategoryData() {
    if (this.activeCategory.toLowerCase() in this.data.categoryData) {
      this.updateValuesForCategory(this.data.categoryData[this.activeCategory.toLowerCase()]);
    }
    else {
      try {
        const res = await this.fire.getCategoryInfo(this.activeCategory);
        this.updateValuesForCategory(res);
        this.data.categoryData[this.activeCategory.toLowerCase()] = res;
        if (this.filters != undefined && Object.keys(this.filters).length)
        this.checkIsCapacity();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async getProducts() {
    try {
      const res = await this.fire.getOneCatProducts(this.activeCategory, 12);
      if (Array.isArray(res)) {
        this.products = this.fire.transformProdResponse(res);
      }
    } catch (error) {
      console.error(error);
    }
  }

  updateValuesForCategory(res:any) {
    this.coverImage = res['coverImg'];
    this.filters = res['filters'];
    this.webFilters = res['webFilters'];
  }

  checkIsCapacity() {
    let keys = Object.keys(this.filters);
    if (keys.includes('capacity')) {
      this.filters['capacity'] = this.webFilters['capacity'];
    }
    if (keys.includes('size')) {
      this.filters['size'] = this.webFilters['size'];
    }
  }

  getFilterValueInArray(value:any) {
    if (Array(value)) {
      return value;
    }
    return [];
  }

  getFilterHeading(heading:any) {
    if (!heading) return '';
    return heading
      .split(' ')
      .map((word:string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
