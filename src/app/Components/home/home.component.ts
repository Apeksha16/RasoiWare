import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/Services/data.service';
import { FireService } from 'src/app/Services/fire.service';
import { CartViewComponent } from 'src/app/cart-view/cart-view.component';
import { QuickViewComponent } from 'src/app/quick-view/quick-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  str = 'assets/icons/cooking.svg';
  category: any[] = [
    {
      name: 'Appliances',
      img: 'appliances',
    },
    {
      name: 'Cookware',
      img: 'cookware',
    },
    {
      name: 'Tableware',
      img: 'tableware',
    },
    {
      name: 'Storage',
      img: 'storage',
    },
    {
      name: 'Decor & Furnishing',
      img: 'decor',
    },
    {
      name: 'Cutlery & Tools',
      img: 'cutlerytools',
    },
    {
      name: 'Outdoor',
      img: 'outdoor',
    },
    {
      name: 'Bandhan Collection',
      img: 'outdoor',
    },
    {
      name: 'Copperware',
      img: 'cooktops',
    },
    {
      name: 'Kitchen Linen',
      img: 'cooktops',
    },
    {
      name: 'Drinkware',
      img: 'cooktops',
    },
  ];

  bestCategories: any[] = [
    {
      name: 'Appliances',
      img: 'appliances',
    },
    {
      name: 'Cookware',
      img: 'cookware',
    },
    {
      name: 'Tableware',
      img: 'tableware',
    },
    {
      name: 'Storage',
      img: 'storage',
    },
    {
      name: 'Home Furnishing',
      img: 'homefurnishing',
    },
  ];
  popularProducts: any[] = [];
  latestProducts: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private dialog: NgbModal,
    private fire: FireService,
    private data:DataService
  ) {
    router.navigate(['/home']);
    // this.fetchAllProducts();
    this.fetchLatestProducts();
    this.fetchPopularProducts();
  }

  getSafeUrl(iconName: string): any {
    const url = `assets/icons/${iconName}.svg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onOpenQuickView() {
    this.dialog.open(QuickViewComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'quick-modal',
      modalDialogClass: 'quick-view',
      backdropClass: 'quick-backdrop',
    });
  }
  onOpenCartView() {
    this.dialog.open(CartViewComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'login',
      backdropClass: 'login-backdrop',
      scrollable: true,
    });
  }
  onCategoryNavigation(category: string) {
    this.router.navigate([category]);
  }
  openPopularProducts() {
    this.router.navigate(['popular-products']);
  }

  fetchLatestProducts() {
    if (this.data.latestProducts.length) {
      this.latestProducts = this.data.latestProducts;
    }
    else {
      this.fire.getTypeOfProducts('isLatest',8).then((res) => {
        if (Array.isArray(res)) {
          this.data.latestProducts = this.fire.transformProdResponse(res);
          this.latestProducts = this.data.latestProducts;
        }
      })
    }
  }

  fetchPopularProducts() {
    if (this.data.popularProducts.length) {
      this.popularProducts = this.data.popularProducts;
    }
    else {
    this.fire.getTypeOfProducts('isPopular',8).then((res) => {
      if (Array.isArray(res)) {
        this.data.popularProducts = this.fire.transformProdResponse(res);
        this.popularProducts = this.data.popularProducts;
      }
    })
  }
}

//  fetchAllProducts() {
//     this.fire.getAllProducts().then((res) => {
//       console.log(res);
//       if (Array.isArray(res)) {
//         this.fire.allProducts = this.fire.transformProdResponse(res);
//         // this.getPopLatestProducts();
//       }

//     })
//  }

//  getPopLatestProducts() {
//     this.popularProducts = this.fire.allProducts.filter((x) => x.isPopular);
//    this.latestProducts = this.fire.allProducts.filter((x) => x.isLatest);
//     console.log(this.popularProducts, this.latestProducts);
//   }

  // getFinalPrice(discount:any, mrp:any) {
  //   return parseFloat(mrp) - ((parseFloat(discount) / 100) * parseFloat(mrp));
  // }
}
