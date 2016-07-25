import {RouterConnector} from './router-connector';

export const provideRouterConnector = () => {
  return [
    RouterConnector
  ];
};

export {RouterConnector};
export {routerReducer, RouterState, RouterActions} from './reducer';
