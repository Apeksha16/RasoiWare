import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
      heading: 'ABOUT RASOIWARE',
      links: [
        'Our Journey so far',
        'Member Login',
        'Contact Us',
        'Gift Card',
      ],
    },
    {
      heading: 'OUR POLICIES',
      links: [
        'Terms & Conditions',
        'Shipping & Return',
        'Privacy Policy',
      ],
    },
    {
      heading: 'INFORMATION',
      links: [
        'Corporate Gifting',
        'Track Your Order',
      'Replacements',
      
      ],
    },
    // {
    //   heading: 'ALSO AVAILABLE ON',
    //   links: ['Wonderchef.com.au', 'Wonderchef.us', 'wonderchef.uk'],
    // },
  ];

  constructor(config: NgbAccordionConfig, private router: Router) {
    config.closeOthers = true;
  }

  navigateToLink(link: string) {
    if (link === 'Return Policy') {
      this.router.navigate(['/return-policy']);
    } else if (link === 'Contact Us') {
      this.router.navigate(['/contact-us']);
    }
  }
}