import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


import { Router } from '@angular/router';
import { SharedModule } from 'src/app/Utils/shared.module';
import { AuthService } from 'src/app/Utils/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[MatCardModule, MatFormFieldModule, FormsModule,CommonModule, ReactiveFormsModule, SharedModule,MatButtonModule, MatInputModule, MatSnackBarModule],
  styleUrls: ['./login.component.css'],

  standalone:true
})
export class LoginComponent {
  username: string = 'pranavkatiyar@gmail.com';
  password: string = 'pranav';

  constructor(private router: Router, private auth:AuthService, private _snack:MatSnackBar) { }

  login() {
    this.auth.login(this.username, this.password).then((res:any)=> {
      if (res.user.auth.currentUser)
      {
        localStorage.setItem('accessToken', res.user.auth.currentUser.accessToken);
        this.auth.setIsLoginState = true;
        this.router.navigate(['/dashboard']);
        }
    }, err => {
      this._snack.open(err.message,'',{
        duration:1000
      })
    })
  }
}
