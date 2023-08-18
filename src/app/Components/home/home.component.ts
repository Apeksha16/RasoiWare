import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuickViewComponent } from 'src/app/quick-view/quick-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  str = 'assets/icons/cooking.svg';
  category: any[] = [
    {
      name: 'Appliances',
      img: 'appliances',
    },
    {
      name: 'Cooking',
      img: 'cooking',
    },
    {
      name: 'Tableware',
      img: 'tableware',
    },
    {
      name: 'Storage',
      img: 'storage',
    },
    {
      name: 'Home Furnishing',
      img: 'homefurnishing',
    },
    {
      name: 'Decor',
      img: 'decor',
    },
    {
      name: 'Cutlery & Tools',
      img: 'cutlerytools',
    },
    {
      name: 'Outdoor',
      img: 'outdoor',
    },
    {
      name: 'Cooktops',
      img: 'cooktops',
    },
  ];

  bestCategories: any[] = [
    {
      name: 'Appliances',
      img: 'appliances',
    },
    {
      name: 'Cooking',
      img: 'cooking',
    },
    {
      name: 'Tableware',
      img: 'tableware',
    },
    {
      name: 'Storage',
      img: 'storage',
    },
    {
      name: 'Home Furnishing',
      img: 'homefurnishing',
    },
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private dialog: NgbModal
  ) {
    router.navigate(['/home']);

  }

  getSafeUrl(iconName: string): any {
    const url = `assets/icons/${iconName}.svg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onOpenQuickView() {
    this.dialog.open(QuickViewComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'login',
      backdropClass: 'login-backdrop',
    });
  }
  onCategoryNavigation() {
    this.router.navigate(['products']);
  }
}
