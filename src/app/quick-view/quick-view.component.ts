import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css'],
})
export class QuickViewComponent implements OnInit {
  productDesc: string[] = [
    'Material: Manufactured Wood',
    'Conversion Types: Day bed; Toddler bed; Bench/Sofa',
    'Mattress Included: No',
    'Compatible Mattress Size: 70 X 140cm',
    'Assembly Required: No',
  ];
  isExpanded: boolean = false;

  constructor(private modalRef: NgbActiveModal) {}

  ngOnInit() {}

  closeModal() {
    // this.modalRef.dismiss();
    this.modalRef.dismiss();
  }
}
