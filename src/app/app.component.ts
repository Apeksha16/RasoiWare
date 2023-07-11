import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './Utils/auth.service';
import { GatewayService } from './Utils/gateway.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'DummyProject';
  checkIsLogin: any = false;
  loading: Observable<boolean> = this.gatewayService.loading$;

  constructor(
    private auth: AuthService,
    private router: Router,
    private gatewayService: GatewayService,
  ) {
  }

  ngAfterViewInit() {
    this.auth.isLogObserver$.subscribe((res) => {
      setTimeout(() => {
        this.checkIsLogin = res;
      },0)
    });

  }
  logout() {
    this.auth.setIsLoginState = false;
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
