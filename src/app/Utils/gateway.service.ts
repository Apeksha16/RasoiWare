import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  // private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login(email: string, password: string) {
  //   return this.fireauth.signInWithEmailAndPassword(email, password);
  // }

  // register(email: string, password: string) {
  //   this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
  //     alert('Registration Successful');
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //     this.router.navigate(['/register']);
  //   })
  // }
  // logout() {
  //   this.fireauth.signOut().then(() => {
  //     this.setLogIn = true;
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //   }
  //   )
  // }


}
