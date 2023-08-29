import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {
  otp: string = '';
  message: string = '';

  verifyOTP() {
  
    if (this.otp === '123456') {
      this.message = 'OTP verified successfully!';
    } else {
      this.message = 'Invalid OTP. Please try again.';
    }
  }
}