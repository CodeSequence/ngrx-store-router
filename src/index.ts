import {Provider} from '@angular/core';
import {usePostMiddleware} from '@ngrx/store';
import routerSubscriber from './subscriber';
import routerPostMiddleware from './middleware';

const routerMiddleware = [
  usePostMiddleware(routerPostMiddleware),
  routerSubscriber
];

export {RouterSubscriber} from './subscriber';
export {routerReducer, RouterState, RouterActions} from './reducer';
export {routerMiddleware};
