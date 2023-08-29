import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  constructor() {}

  fireStore: any = getFirestore();

  // async sendOtp(mobNo: string) {
  //   const auth = getAuth();

  //   const appVerify = new RecaptchaVerifier(
  //     'sign-in-btn',
  //     {
  //       size: 'invisible',
  //     },
  //     auth
  //   );
  //   appVerify.render();

  //   const confirmationResult = await signInWithPhoneNumber(
  //     auth,
  //     mobNo,
  //     appVerify
  //   );
  //   console.log(confirmationResult);
  // }
}
