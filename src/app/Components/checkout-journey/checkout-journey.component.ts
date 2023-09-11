import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout-journey',
  templateUrl: './checkout-journey.component.html',
  styleUrls: ['./checkout-journey.component.css'],
})
export class CheckoutJourneyComponent {
  selectedAddress = {
    firstName: 'Apeksha',
    lastName: 'Verma',
    address: 'A-169, Galaxy North Avenue 2, Gaur City 2, Sector 16 C',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    pincode: '201301',
    mobileNumber: '7668804527',
    addressType: 'Home',
    default: true,
  };

  selectedProduct = [
    {
      prdId: 'ODESJOWD9320394XXX',
      prdName: 'Galaxy North Avenue 2, Gaur City 2, NEw PRoduct name change',
      prdPrice: '3432.12',
      prdDiscount: '14',
      prdImg: 'assets/images/google.png',
      prdQty: '2',
      prdBrand: 'WonderChef',
      prdFilters: [
        {
          name: 'Color',
          values: [
            {
              name: 'Red',
              value: '#333',
              selected: true,
            },
            {
              name: 'Blue',
              value: '#666',
              selected: false,
            },
            {
              name: 'Green',
              value: '#aaa',
              selected: false,
            },
          ],
        },
        {
          name: 'Size',
          values: [
            {
              name: 'Small',
              value: 'SM',
              selected: false,
            },
            {
              name: 'Medium',
              value: 'MD',
              selected: false,
            },
            {
              name: 'Large',
              value: 'LG',
              selected: true,
            },
            {
              name: 'Extra Large',
              value: 'XL',
              selected: false,
            },
          ],
        },
      ],
    },
    {
      prdId: 'ODESJOWD9320394XXX',
      prdName: 'Galaxy North Avenue 2, Gaur City 2, NEw PRoduct name change',
      prdPrice: '3432.12',
      prdDiscount: '14',
      prdImg: 'assets/images/google.png',
      prdQty: '2',
      prdBrand: 'WonderChef',
      prdFilters: [
        {
          name: 'Color',
          values: [
            {
              name: 'Red',
              value: '#333',
              selected: true,
            },
            {
              name: 'Blue',
              value: '#666',
              selected: false,
            },
            {
              name: 'Green',
              value: '#aaa',
              selected: false,
            },
          ],
        },
        {
          name: 'Size',
          values: [
            {
              name: 'Small',
              value: 'SM',
              selected: false,
            },
            {
              name: 'Medium',
              value: 'MD',
              selected: false,
            },
            {
              name: 'Large',
              value: 'LG',
              selected: true,
            },
            {
              name: 'Extra Large',
              value: 'XL',
              selected: false,
            },
          ],
        },
      ],
    },
  ];

  onRemove() {
    console.log('remove');
  }
}
