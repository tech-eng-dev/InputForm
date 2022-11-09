import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { PersonState } from 'src/app/core/store/reducer/person.reducer';
import { addPerson, updatePerson } from 'src/app/core/store/action/person.actions';
import { Person } from 'src/app/core/models/person.model';
import { getPersons } from 'src/app/core/store/selector/person.selectors';
import { PersonColumn } from 'src/app/core/enums/person-column.enum';
import { ChartMargin } from 'src/app/core/models/chart-margin.model';
import { v4 as uuid } from 'uuid';
import { NotificationHelperService } from 'src/app/core/helpers/notification-helper.service';
import { DialogHelperService } from 'src/app/core/helpers/dialog-helper.service';
import { ChartDialogComponent } from 'src/app/shared/components/dialogs/chart-dialog/chart-dialog.component';
import { Size } from 'src/app/core/enums/size.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('inputForm') inputForm: ElementRef;
  @ViewChild('chartIconContainer') chartIconContainer: ElementRef;

  displayedColumns = [PersonColumn.Name, PersonColumn.Age, PersonColumn.Weight, PersonColumn.Friends];
  chartMargin: ChartMargin = { top: 20, bottom: 20, left: 30, right: 30 };
  persons: Person[] = [];
  person: Person;
  personsContainerHeight: string;
  personsContainerHeightTimeout: any;

  constructor(
    private store: Store<PersonState>,
    private notificationHelper: NotificationHelperService,
    private dialogHelper: DialogHelperService
  ) {
  }

  ngOnInit() {
    this.store.select(getPersons)
      .subscribe((persons: Person[]) => {
        this.persons = persons;
      });
  }

  ngAfterViewInit(): void {
    this.calcPersonsContainerHeight();
  }

  ngOnDestroy(): void {
    clearTimeout(this.personsContainerHeightTimeout);
  }

  onDispatchValues(person: Person) {
    const _persons = person.id ? this.persons.filter(p => p.id !== person.id) : this.persons;
    const index = _persons.findIndex((p: Person) => p?.name === person?.name &&
        p.age === person.age &&
        p.weight === person.weight);
    this.performAction(index, person);
  }

  onPersonClicked(person: Person) {
    this.person = {...person};
  }

  onOpenChart() {
    const model = {
      chartMargin: this.chartMargin,
      persons: this.persons
    };
    this.dialogHelper.openDialog(ChartDialogComponent, model, Size.Full, Size.Full);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calcPersonsContainerHeight();
  }

  private performAction(index: number, person: Person) {
    if (index !== -1) {
      this.notificationHelper.showTextNotification('There is a same person already!');
    } else {
      if (person.id) {
        this.updatePerson(person);
      } else {
        this.addPerson(person);
      }
    }
  }

  private updatePerson(person: Person) {
    this.store.dispatch(updatePerson({...person}));
  }

  private addPerson(person: Person) {
    const id = uuid();
    person = {...person, id};
    this.store.dispatch(addPerson({...person}));
  }

  private calcPersonsContainerHeight() {
    clearTimeout(this.personsContainerHeightTimeout);
    this.personsContainerHeightTimeout = setTimeout(() => {
      if (this.inputForm && this.inputForm.nativeElement && this.chartIconContainer && this.chartIconContainer.nativeElement) {
        const inputFormHeight = this.inputForm.nativeElement.getBoundingClientRect().height;
        const chartIconContainerHeight = this.chartIconContainer.nativeElement.getBoundingClientRect().height;
        const height = `calc(100% - ${inputFormHeight}px - ${chartIconContainerHeight}px)`;
        this.personsContainerHeight = height;
      }
    });
  }
}
