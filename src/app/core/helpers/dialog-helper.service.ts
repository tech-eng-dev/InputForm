import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Size } from '../enums/size.enum';
import { DialogConfig } from '../models/dialog-config.model';

@Injectable({
  providedIn: 'root'
})
export class DialogHelperService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(
    component: ComponentType<any>,
    model: any,
    width = Size.Medium,
    height = Size.Medium,
    config?: DialogConfig
  ) {
    this.dialog.open(component, {
      data: model,
      width,
      height,
      panelClass: config?.panelClass,
      id: config?.id,
      disableClose: true,
    });
  }
}
