import { Component } from '@angular/core';
import { AuthService } from './Utils/auth.service';
import { GatewayService } from './Utils/gateway.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DummyProject';
  checkIsLogin: any;

  constructor(
    private auth: AuthService,
    private router:Router
  ) {

    this.auth.isLogObserver$.subscribe((res) => {
      this.checkIsLogin = res;
      console.log('auth observe', res);
    })


  }

  logout() {
    this.auth.setIsLoginState = false;
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

}
