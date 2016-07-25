import { Action } from '@ngrx/store';

const initialState = {
  init: false,
  url: '',
  navigating: false
};

export interface RouterState {
  init?: boolean;
  url: string;
  navigating?: boolean;
}

export const RouterActions = {
  init: '[ROUTER] INITIALIZED',
  navigated: '[ROUTER] NAVIGATED',
  navigating: '[ROUTER] NAVIGATING'
};

export const routerReducer = (state: RouterState = initialState, action: Action): RouterState => {
  switch (action.type) {
    case RouterActions.init:
      return Object.assign({}, state, { url: action.payload.url, init: true });
    case RouterActions.navigating:
      return Object.assign({}, state, { url: action.payload.url, navigating: true });
    case RouterActions.navigated:
      return Object.assign({}, state, { url: action.payload.url, navigating: false });
    default:
      return state;
  }
};
