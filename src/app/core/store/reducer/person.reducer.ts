import { Action, createReducer, on } from '@ngrx/store';
import { Person } from '../../models/person.model';
import * as PersonActions from '../action/person.actions';

export const personFeatureKey = 'person';

export interface PersonState {
  persons: Person[];
}

export const initialState: PersonState = {
  persons: [],
}

export const personReducer = createReducer(
  initialState,
  on(PersonActions.updatePerson, (state: PersonState, {person}) => {
    const index = state.persons.findIndex((p: Person) => p?.id === person?.id);
    if (index === -1) {
      return {...state, persons: [...state.persons, person]};
    } else {
      const persons = [...state.persons];
      persons[index] = person;
      return {...state, persons: persons};
    }
  }),
  on(PersonActions.getPersons, (state: PersonState, {}) => ({
    ...state,
    selectedPersonId: null
  })),
  on(PersonActions.addPerson, (state: PersonState, {person}) => ({
    ...state,
    persons: [...state.persons, person]
  }))
)

export function reducer(state: PersonState | undefined, action: Action): any {
  return personReducer(state, action);
}
