import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnDestroy {

  private subscription: Subscription;
  private productId: string = '';

  constructor(
    private router: ActivatedRoute,
  private prodService:ProductsService
  ) {
    this.subscription = router.url.subscribe(x => {
      this.productId = decodeURI(x[1].path);
      this.fetchProductDetails();
  });
  }

  fetchProductDetails() {
    this.prodService.fetchProductDetails(this.productId).then(x => {
      console.log(x);
    }).catch((e) => {
      console.log(e);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
