import { AppGlobalService } from 'src/app/core/services/app-global.service';
import { SnackBarComponent } from './../components/snack-bar/snack-bar.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar,
    public app: AppGlobalService
  ) { }

  open(title, message) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        title: title,
        message: message
      },
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })

    let setColor = document.getElementsByClassName('mat-snack-bar-container')[0];
    switch (title) {
      case this.app.TypeOfSnackBar.Error:
        setColor.setAttribute("style", "background-color: red;");
        break;
    }
  }
}
