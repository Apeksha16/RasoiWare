import { Component } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})
export class CartViewComponent {
  otp: string = '';
  message: string = '';

  cartProducts: any[] = [
    {
      prdId: 'BOTTLEXJEDK20390382',
      prdBrandName: 'Borosil',
      orderImg: 'assets/images/prd-img-1.webp',
      orderPrice: '4659.43',
      productName: 'This is a product name for testing purpose.',
    },
    {
      prdId: 'BOTTLEXJEDK20390382',
      prdBrandName: 'WonderChef',
      orderImg: 'assets/images/prd-img-1.webp',
      orderPrice: '738.25',
      productName: 'This is another product name for testing purpose.',
    },
    {
      prdId: 'BOTTLEXJEDK20390382',
      prdBrandName: 'WonderChef',
      orderImg: 'assets/images/prd-img-1.webp',
      orderPrice: '738.25',
      productName: 'This is another product name for testing purpose.',
    },
  ];

  constructor(public modalService: NgbActiveModal) {}

  verifyOTP() {
    if (this.otp === '123456') {
      this.message = 'OTP verified successfully!';
    } else {
      this.message = 'Invalid OTP. Please try again.';
    }
  }
}
