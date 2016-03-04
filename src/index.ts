import {Provider} from 'angular2/core';
import routerSubscriber from './subscriber';
import routerPostMiddleware from './middleware';

const routerMiddleware: Provider[] = [
  routerSubscriber,
  routerPostMiddleware
];

export {RouterSubscriber} from './subscriber';
export {routerReducer, RouterState, RouterActions} from './reducer';
export {routerMiddleware};
