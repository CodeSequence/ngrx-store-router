# ngrx-store-router

Sync between the current Angular 2 Router URL and @ngrx/store

This middleware is used along with `@ngrx/store` and `@ngrx/devtools` to navigate between routes while changing state

### Installation

- Install from npm : `npm install ngrx-store-router`

### Usage

- In your app's main module, import the router reducer, add the reducer to the `provideStore()` function, and add the `routerMiddleware` to provide them to Angular's injector:

```typescript

import {bootstrap} from 'angular2/platform/bootstrap';
import {provideStore} from '@ngrx/store';
import {App} from './app';

import {routerReducer, routerMiddleware} from 'ngrx-store-router';

bootstrap(App, [
  provideStore({router: routerReducer}),
  routerMiddleware
]);

```

## Contributing

Pull requests and issues are welcome
