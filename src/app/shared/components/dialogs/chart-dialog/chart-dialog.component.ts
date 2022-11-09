import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartMargin } from 'src/app/core/models/chart-margin.model';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent implements OnInit {

  persons: Person[];
  chartMargin: ChartMargin;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.chartMargin = this.data.chartMargin;
    this.persons = this.data.persons;
  }
}
