import { Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  myOrderList: any[] = [
    {
      orderStatus: 'CONFIRMED',
      orderStatusDesc: "We've got it!",
      orderNo: '434334',
      orderDate: '20//12/2004',
      estimatedDate: '24/12,2045',
      orderImg: '',
      orderPrice: '4659.43',
      productName: 'Product name to be shown for order purpose.',
      prodBrandName: 'WonderChef',
    },
  ];
}
