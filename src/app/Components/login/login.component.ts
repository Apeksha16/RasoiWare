import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { Router } from '@angular/router';
import { SharedModule } from 'src/app/Utils/shared.module';
import { GatewayService } from 'src/app/Utils/gateway.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[MatCardModule, MatFormFieldModule, FormsModule,CommonModule, ReactiveFormsModule, SharedModule,MatButtonModule, MatInputModule],
  styleUrls: ['./login.component.css'],

  standalone:true
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private gateway:GatewayService) { }

  login() {
    // if (this.username === 'admin' && this.password === '123') {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   alert('Invalid username or password');
    // }
    this.gateway.login(this.username, this.password);


  }
}
