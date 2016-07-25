import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RouterActions } from './reducer';

@Injectable()
export class RouterConnector {
  routerSubscription: Subscription;
  storeSubscription: Subscription;

  latestUrl: Observable<string> = this.router
    .events
    .filter((event: Event) => event instanceof NavigationEnd)
    .map(() => this.router.url)
    .distinctUntilChanged();

  routerSelect = this.store.select(state => state.router);

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  connect() {
    this.initRouterSubscriber();
    this.initStoreSubscriber();
  }

  disconnect() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  initRouterSubscriber() {
    this.routerSubscription = this.latestUrl
      .withLatestFrom(this.routerSelect)
      .filter(([url, rs]) => this.initialized(rs, url))
      .filter(([url, rs]) => this.urlChanged(rs, url))
      .map(([url]) => {
        return {
          type: RouterActions.navigated,
          payload: {url}
        };
      })
      .subscribe(this.store);
  }

  initStoreSubscriber() {
    this.storeSubscription = this.routerSelect
      .withLatestFrom(this.latestUrl)
      .filter(([rs, url]) => this.isInit(rs) && this.urlChanged(rs, url))
      .map(([rs]) => rs.url)
      .do(url => this.router.navigateByUrl(url))
      .subscribe();
  }

  isInit(rs: any) {
    return rs.init;
  }

  initialized(rs: any, url: string) {
    let init = this.isInit(rs);

    if (!init) {
      this.store.dispatch({
        type: RouterActions.init,
        payload: {url}
      });
    }

    return init;
  }

  urlChanged(rs: any, url: string) {
    return rs.navigating || rs.url !== url;
  }
}
