import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  usersRef: AngularFireList<any> | undefined;
  user: AngularFireObject<any> | undefined;

  constructor(
    private router: Router,
    private db :AngularFireDatabase
  ) { }

  login() {
    if (this.username === 'admin' && this.password === '123') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password');
    }
    localStorage.setItem('adminName', this.username);
  }

  onAdd()
  {
    this.usersRef?.push({
      username: this.username,
      password:this.password
    })
  }

}
