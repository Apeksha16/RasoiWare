import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  constructor(private modalService: NgbModal) {
    this.modalService.open(LoginComponent, {
      size: 'lg',
      windowClass: 'login',
      backdropClass: 'login-backdrop',
      centered: true,
    });
  }

  openModal(loginModal: TemplateRef<any>) {
    this.modalService.open(loginModal, {
      size: 'lg',
      // centered: true,
      windowClass: 'login-modal',
      backdropClass: 'custom',
    });
  }
  onLoginPopup() {
    this.modalService.dismissAll();
    this.modalService.open(LoginComponent, {
      size: 'lg',
      windowClass: 'login',
      backdropClass: 'login-backdrop',
      centered: true,
    });
  }
}
