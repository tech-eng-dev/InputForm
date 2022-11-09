import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { personFeatureKey, personReducer } from '../core/store/reducer/person.reducer';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [personFeatureKey],
    rehydrate: true,
    storage: sessionStorage
  })(reducer);
}

export interface State {
}

export const reducers: ActionReducerMap<State> = {
  [personFeatureKey]: personReducer
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]
