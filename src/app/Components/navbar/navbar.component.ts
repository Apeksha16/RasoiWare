import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { CartViewComponent } from 'src/app/cart-view/cart-view.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  configList: any = [
    {
      itemName: 'Orders',
      iconName: 'fa-bag-shopping',
    },
    {
      itemName: 'My Profile',
      iconName: 'fa-bell',
    },
  ];

  constructor(private modalService: NgbModal, private router: Router) {
    // this.openCart();
  }

  openCart() {
    this.modalService.open(CartViewComponent, {
      windowClass: 'cart-window',
      modalDialogClass: 'cart-modal',
      size: 'sm',
      centered: false,
      backdrop: false,
    });
  }

  openModal(loginModal: TemplateRef<any>) {
    this.modalService.open(loginModal, {
      size: 'lg',
      windowClass: 'login-modal',
      backdropClass: 'custom',
    });
  }
  onLoginPopup() {
    this.modalService.dismissAll();
    this.modalService.open(LoginComponent, {
      // size: 'lg',
      windowClass: 'login',
      backdropClass: 'login-backdrop',
      centered: true,
    });
  }

  onHomeNavigation() {
    this.router.navigate(['/home']);
  }
  orderDetails(item: any) {
    if (item.itemName == 'Orders') {
      this.router.navigate(['my-orders']);
    } else if (item.itemName == 'My Profile') {
      this.router.navigate(['my-profile']);
    }
    this.modalService.dismissAll();
  }

  navigateToProducts() {
    this.router.navigate(['products']);
  }
  navigateToContactUs() {
    this.router.navigate(['contact-us']);
  }
}
