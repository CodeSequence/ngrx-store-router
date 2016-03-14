import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {provide, Provider, Injector, OpaqueToken} from 'angular2/core';
import {Router, Location} from 'angular2/router';
import {Store, createMiddleware, Dispatcher} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {RouterActions} from './reducer';

export const RouterSubscriber = new OpaqueToken('RouterSubscribe');

export default provide(RouterSubscriber, {
  deps: [Injector, Router, Location],
  useFactory(injector: Injector, router: Router, location: Location) {
    const getStore = () => injector.get(Store);

    (<Observable<string>>router['_subject'])
      .distinctUntilChanged()
      .map(() => location.path())
      .filter((url) => {
        let store = getStore();
        let init = store.getState().router.init;

        if (!init) {
          store.dispatch({
            type: RouterActions.init,
            payload: {url}
          });
        }

        return init;
      })
      .filter(url => url !== getStore().getState().router.url)
      .map((url) => {
        return {
          type: RouterActions.navigated,
          payload: {url}
        }
      })
      .subscribe((action) => {
        getStore().dispatch(action);
      });
  }
});
