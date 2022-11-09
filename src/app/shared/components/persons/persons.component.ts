import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonColumn } from 'src/app/core/enums/person-column.enum';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  @Input() persons: Person[];
  @Input() displayedColumns: PersonColumn[];
  @Output() personClicked = new EventEmitter<Person>();

  personColumnEnum = PersonColumn;
  clickedRows = new Set<PersonColumn>();

  constructor() { }

  ngOnInit(): void {
  }

  onRowClicked($event: Person) {
    this.personClicked.emit($event);
  }
}
