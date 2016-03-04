import {provide, Provider, Injector} from 'angular2/core';
import {Middleware, POST_MIDDLEWARE} from '@ngrx/store';
import {RouterSubscriber} from './subscriber';
import {Router} from 'angular2/router';
import {currentUrl} from './util';

export default provide(POST_MIDDLEWARE, {
  multi: true,
  deps: [Router, RouterSubscriber],
  useFactory(router: Router, rs: any) {
    return (state): Middleware => {
      return state.do(s => {
        if (s.router.url !== currentUrl()) {
          router.navigateByUrl(s.router.url);
        }
      })
    };
  }
});
