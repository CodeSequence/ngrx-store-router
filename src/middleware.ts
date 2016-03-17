import 'rxjs/add/operator/do';
import {provide, Provider, Injector} from 'angular2/core';
import {createMiddleware} from '@ngrx/store';
import {RouterSubscriber} from './subscriber';
import {Router, Location} from 'angular2/router';

export default createMiddleware((router: Router, location: Location, rs: any) => {
  return state$ => state$.do(s => {
      if (s.router.init && (s.router.navigating || s.router.url !== location.path())) {
        router.navigateByUrl(s.router.url);
      }
    });
}, [Router, Location, RouterSubscriber]);
