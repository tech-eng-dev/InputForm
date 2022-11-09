import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit, OnChanges {
  @Input() person: Person | null;
  @Output() dispatchValues = new EventEmitter<Person>();

  formGroup: FormGroup;
  addOnBlur: boolean = true;
  _friends: string[] = [];

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { person } = changes;

    if (!!person && !!person?.currentValue) {
      this.createForm();
    }
  }

  onAddFriend(event: MatChipInputEvent) {
    this._friends = [...this._friends];
    const value = (event.value || '').trim();
    if (value) {
      this._friends.push(value);
    }
    this.formGroup.controls['friends'].setValue(this._friends);
    event.chipInput!.clear();
  }

  onRemoveFriend(friend: string) {
    this._friends = [...this._friends];
    const index = this._friends.findIndex((f: string) => f === friend);
    if (index !== -1) {
      this._friends.splice(index, 1);
    }
  }

  onDispatchValues() {
    let formValues = {...this.formGroup.value, friends: this._friends};
    if (this.person) {
      formValues = { ...formValues , id: this.person.id};
    }
    this.dispatchValues.emit(formValues);
    this.resetForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      name: [this.person?.name, [Validators.required]],
      age: [this.person?.age, [Validators.required, Validators.pattern("^[0-9]*$")]],
      weight: [this.person?.weight, [Validators.required, Validators.pattern("^[0-9]*$")]],
      friends: [],
    });
    this._friends = this.person?.friends || [];
  }

  private resetForm() {
    this._friends = [];
    this.person = null;
    this.formGroup.reset();
  }
}
