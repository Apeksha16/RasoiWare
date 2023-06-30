import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res:any) => {
      if (res.user.auth.currentUser)
      {
        console.log(res.user.auth.currentUser.accessToken);
        localStorage.setItem('accessToken', res.user.auth.currentUser.accessToken);
        this.router.navigate(['dashboard']);
        }

      console.log(res);

    }, err => {
      alert(err.message);
      // this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    }
    )
  }


}
