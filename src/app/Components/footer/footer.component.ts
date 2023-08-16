import { Component } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // panels = ['First', 'Second', 'Third'];

  footerPanels = [
    {
      heading: 'ABOUT WONDERCHEF',
      links: [
        'Our Story',
        'Blogs & Recipes',
        'Contact Us',
        'Member Login',
        'Gift Card',
      ],
    },
    {
      heading: 'OUR POLICIES',
      links: [
        'Return Policy',
        'Terms & Conditions',
        'Privacy Policy',
        'Wonderpoints T&C',
        'Investor',
      ],
    },
    {
      heading: 'INFORMATION',
      links: [
        'E-Recipe Books',
        'Warranty Details',
        'Track Your Order',
        'Replace Your Product',
        'Locate Brand Outlets',
        'Franchise',
        'Corporate Gifting',
      ],
    },
    {
      heading: 'ALSO AVAILABLE ON',
      links: ['Wonderchef.com.au', 'Wonderchef.us', 'wonderchef.uk'],
    },
  ];

  constructor(config: NgbAccordionConfig) {
    config.closeOthers = true;
  }
}
