import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { arrayRemove } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  otpbox: boolean=false;
  constructor(public activeModal: NgbActiveModal) {}

  visibleOTPBoxes(){
this.otpbox=true;
  }
}
