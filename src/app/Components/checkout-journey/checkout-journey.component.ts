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
}
