import {provide, Provider, Injector, OpaqueToken} from 'angular2/core';
import {Router} from 'angular2/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {RouterActions} from './reducer';
import {currentUrl} from './util';

export const RouterSubscriber = new OpaqueToken('RouterSubscribe');

export default provide(RouterSubscriber, {
  deps: [Injector, Router],
  useFactory(injector: Injector, router: Router) {
    const getStore = () => injector.get(Store);

    (<Observable<string>>router['_subject'])
      .distinctUntilChanged()
      .map(() => currentUrl())
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
