import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('myModal') modalContent: any;

  constructor(private modalService: NgbModal) { }

  openModal() {
    this.modalService.open(this.modalContent);
  }
}
