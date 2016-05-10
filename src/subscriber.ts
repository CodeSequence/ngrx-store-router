import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {provide, Provider, ReflectiveInjector, OpaqueToken} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Store, createMiddleware, Dispatcher} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {RouterActions} from './reducer';

export const RouterSubscriber = new OpaqueToken('RouterSubscriber');

export default provide(RouterSubscriber, {
  deps: [ReflectiveInjector, Router, Location],
  useFactory(injector: ReflectiveInjector, router: Router, location: Location) {
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
      .filter(url => {
        let router = getStore().getState().router;

        return router.navigating || url !== router.url;
      })
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
