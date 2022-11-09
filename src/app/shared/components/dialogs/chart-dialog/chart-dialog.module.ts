import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDialogComponent } from './chart-dialog.component';
import { ChartModule } from '../../chart/chart.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    MatDialogModule,
  ],
  declarations: [ChartDialogComponent],
  exports: [ChartDialogComponent],
  entryComponents: [ChartDialogComponent]
})
export class ChartDialogModule { }
