import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { getFirestore,doc, getDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogObserver$: Observable<boolean> = this.isLoggedIn.asObservable();

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    ) {
    const userSession = localStorage.getItem('accessToken') || '';
    if (userSession.length) {
      this.setIsLoginState = true;
    }
    else {
      this.setIsLoginState = false;
    }

  }

  set setIsLoginState(val: boolean) {
    this.isLoggedIn.next(val);
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
      this.afAuth.signOut()
        .then(() => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
        })
        .catch(error => {
          console.error('Logout error:', error);
        })
  }

}
