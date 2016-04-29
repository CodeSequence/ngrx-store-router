import 'rxjs/add/operator/do';
import {provide, Provider} from 'angular2/core';
import {createMiddleware} from '@ngrx/store';
import {RouterSubscriber} from './subscriber';
import {Router} from 'angular2/router';
import {Location} from 'angular2/platform/common';

export default createMiddleware((router: Router, location: Location, rs: any) => {
  return state$ => state$.do(s => {
      if (s.router.init && (s.router.navigating || s.router.url !== location.path())) {
        router.navigateByUrl(s.router.url);
      }
    });
}, [Router, Location, RouterSubscriber]);
