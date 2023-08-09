import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  constructor(private modalService: NgbModal) {}

  openModal(loginModal: TemplateRef<any>) {
    this.modalService.open(loginModal, {
      size: 'lg',
      centered: true,
      windowClass: 'login-modal',
    });
  }
}
