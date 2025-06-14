import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { UserEffects } from './effects/user/user.effect';
import { userReducer } from './reducers/user/user.reducer';
import { ordersReducer } from './reducers/order/order.reducer';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideStore({ users: userReducer, orders: ordersReducer }),
    provideEffects([UserEffects]),
    provideClientHydration()
  ]
};
