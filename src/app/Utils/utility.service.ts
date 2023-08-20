import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private _snackBar: MatSnackBar) {}

  showMessage(message: string = '') {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
