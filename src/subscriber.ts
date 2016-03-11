import {provide, Provider, Injector, OpaqueToken} from 'angular2/core';
import {Router, Location} from 'angular2/router';
import {Store, createMiddleware, Dispatcher} from '@ngrx/store';
import {Observable} from 'rxjs';
import {RouterActions} from './reducer';

export const RouterSubscriber = new OpaqueToken('RouterSubscribe');

export default provide(RouterSubscriber, {
  deps: [Injector, Router, Location],
  useFactory(injector: Injector, router: Router, location: Location) {
    const getStore = () => injector.get(Store);

    (<Observable<string>>router['_subject'])
      .distinctUntilChanged()
      .map(() => location.path())
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
