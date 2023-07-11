import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { FirebaseApp } from 'firebase/app';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    // private fireBase:FirebaseApp,
    private router: Router
  ) {

   }
   setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }
}
