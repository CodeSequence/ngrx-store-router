import {Reducer, Action, Store} from '@ngrx/store';
import {currentUrl} from './util';

const initialState = {
  url: currentUrl(),
  navigating: false
};

export interface RouterState {
  url?: string;
  navigating?: boolean;
}

export const RouterActions = {
  navigated: 'NAVIGATED',
  navigating: 'NAVIGATING'
}

export const routerReducer:Reducer<Object> = (state: RouterState = initialState, action: Action) => {
  switch(action.type) {
    case RouterActions.navigating:
      return Object.assign({}, state, { navigating: true });
    case RouterActions.navigated:
      return Object.assign({}, state, { url: action.payload.url, navigating: false });
    default:
      return state;
  }
};
