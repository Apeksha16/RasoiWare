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
      orderDate: '20/12/2004',
      estimatedDate: '24/12/2045',
      orderInfo: [
        {
          prdId: 'BOTTLEXJEDK20390382',
          prodBrandName: 'WonderChef',
          orderImg: 'assets/images/google.png',
          orderPrice: '4659.43',
          productName:
            'Product name to be shown for order purpose. New Product name for lorem ipsum e che u dadf.',
        },
        {
          prdId: 'BOTTLEXJEDK20390382',
          prodBrandName: 'Amazon',
          orderImg: 'assets/images/products.jpeg',
          orderPrice: '5672.19',
          productName:
            'New Product name for lorem ipsum e che u dadf. Product name to be shown for order purpose.',
        },
      ],
    },
    {
      orderStatus: 'COMPLETE',
      orderStatusDesc: 'Enjoying!',
      orderNo: '673829',
      orderDate: '14/02/2005',
      estimatedDate: '12/09/2013',
      orderInfo: [
        {
          prdId: 'BOTTLEXJEDK20390382',
          prodBrandName: 'Borosil',
          orderImg: 'assets/images/prd-img-1.webp',
          orderPrice: '4659.43',
          productName: 'This is another product name for testing purpose.',
        },
      ],
    },
  ];
}
