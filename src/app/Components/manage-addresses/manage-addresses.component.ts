import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css'],
})
export class ManageAddressesComponent {
  showAddressForm: boolean = false;
  myAddresses: any[] = [
{
  firstName:'Apeksha',
  lastName:'Verma',
  address:'A-169, Galaxy North Avenue 2, Gaur City 2, Sector 16 C',
  city: 'Greater Noida',
state: 'Uttar Pradesh',
country:'India',
  pincode:'201301',
  mobileNumber:'7668804527',
  addressType:'Home',
  default: true,

},



    // '1234 Magnolia Crescent, Apartment #567, Block D, Sunrise Residency, Lakeview Nagar, Sector 22, Gurgaon, Haryana - 122001, India',
    // '7890 Willow Lane, Building A2, Floor 4, Bayside Towers, Seafront Road, Colaba, Mumbai, Maharashtra - 400005, India',
    // '4567 Redwood Avenue, Suite #1234, The Green Tower, Central Business District, Whitefield, Bangalore, Karnataka - 560066, India',
    // '2345 Maple Street, House #9876, Surya Apartments, Beach Road, Besant Nagar, Chennai, Tamil Nadu - 600090, India',
    // '6789 Oakwood Drive, Flat #4321, Riverside Residences, Riverside Avenue, Howrah, Kolkata, West Bengal - 700010, India',
    // '5432 Pine Street, Wing B, Floor 5, Serene Heights, Serilingampally, Hyderabad, Telangana - 500081, India',
  ];

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }
}
