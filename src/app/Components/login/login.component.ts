import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { arrayRemove } from 'firebase/firestore';
import { FireService } from 'src/app/Services/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  otpbox: boolean = false;
  btnName: string = 'Get';
  constructor(public activeModal: NgbActiveModal, private auth: FireService) {}

  visibleOTPBoxes() {
    this.btnName = 'Verify';
    this.otpbox = true;
  }

  sendOtp() {
    // this.auth.sendOtp('+918009225514');
  }
}
