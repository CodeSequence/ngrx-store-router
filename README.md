# ngrx-store-router

Sync between the current Angular 2 Router URL and @ngrx/store

This service is to be used along with `@ngrx/store` and `@ngrx/store-devtools` to navigate between routes while changing state

### Demo

http://plnkr.co/edit/Gvg9fW?p=preview

### Installation

- Install from npm : **DEPRECATED Router** `npm install ngrx-store-router@0.2.0 --save`
- Install from npm : `npm install ngrx-store-router --save`

### Usage

- In your app's main module, import the router reducer, add the reducer to the `provideStore()` function under the name `router`, and add the `provideRouterConnector()` to provide them to Angular 2.

```typescript
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideStore} from '@ngrx/store';
import {App} from './app';

import {routerReducer, provideRouterConnector} from 'ngrx-store-router';

bootstrap(App, [
  provideStore({router: routerReducer}),
  provideRouterConnector()
]);
```

- In your app's main component, import the `RouterConnector` service and call the `connect` function to initialize the router sync to the store. To stop the router from syncing with the store, use the `disconnect` function.

```typescript
import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouterConnector} from 'ngrx-store-router';

@Component({ ... })
export class App implements OnInit, OnDestroy {
  constructor(private rc: RouterConnector) {}

  ngOnInit() {
    this.rc.connect();
  }

  ngOnDestroy() {
    this.rc.disconnect();
  }
}

```

## Contributing

Pull requests and issues are welcome
