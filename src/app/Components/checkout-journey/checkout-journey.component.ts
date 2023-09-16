import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FireService } from 'src/app/Services/fire.service';

@Component({
  selector: 'app-checkout-journey',
  templateUrl: './checkout-journey.component.html',
  styleUrls: ['./checkout-journey.component.css'],
})
export class CheckoutJourneyComponent implements AfterViewInit {
  @ViewChild('myButton') myButton?: ElementRef;

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

  windowRef: any;

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

  constructor(private fire: FireService, private modalService: NgbModal) {
    this.windowRef = this.fire.WindowRef;
  }
  ngAfterViewInit() {
    // this.myButton?.nativeElement.click();
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        modalDialogClass: 'success-dialog',
        centered: true,
        size: 'lg',
        windowClass: 'quick-modal',
      })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed`);
        }
      );
  }

  onRemove() {
    console.log('remove');
  }

  onNavtoPay() {
    // window.open('https://rzp.io/l/rbPc4MC', '_blank');
  }

  onPaymentClick(modal: TemplateRef<any>) {
    console.log('Clicked Payment');
    var ref = this;
    let options = {
      key: 'rzp_test_OCTIp3wunAVxaq',
      amount: '100',
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://angular.io/assets/images/logos/angular/angular.png',
      order_id: 'order_MbWIQiVMXSAJ9Z',
      config: {
        display: {
          blocks: {
            banks: {
              name: 'All payment methods',
              instruments: [
                {
                  method: 'upi',
                },
                {
                  method: 'card',
                },
                {
                  method: 'netbanking',
                },
              ],
            },
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
      handler: function (response: any) {
        ref.handlePayment(response);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    // let razor = new this.windowRef.Razorpay(options);
    // razor.open();
    this.open(modal);
  }
  handlePayment(res: any) {
    console.log(res);
  }
}
