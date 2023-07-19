import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GatewayService } from '../Utils/gateway.service';
import { AuthService } from '../Utils/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faSearch = faSearch;

  // fa-facebook = fa-facebook;

  title = 'DummyProject';
  checkIsLogin: any = false;
  loading: Observable<boolean> = this.gatewayService.loading$;

  constructor(
    private auth: AuthService,
    private router: Router,
    private gatewayService: GatewayService
  ) {}
}
