import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationHelperService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  showTextNotification(message = 'Success!') {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
