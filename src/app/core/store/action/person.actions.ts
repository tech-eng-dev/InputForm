import { createAction } from '@ngrx/store';
import { Person } from '../../models/person.model';

export const updatePerson = createAction(
  '[Person] update Person',
  (person: Person) => ({person})
)

export const getPersons = createAction(
  '[Person] get Persons',
  (persons: Person[]) => ({persons})
)

export const addPerson = createAction(
  '[Person] add Person',
  (person: Person) => ({person})
)
