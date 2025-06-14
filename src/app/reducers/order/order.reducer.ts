// src/app/store/order.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../../actions/user/user.action';
import { OrdersState, ordersAdapter } from '../../models/state/state.interface';


export const initialOrdersState: OrdersState = ordersAdapter.getInitialState();

export const ordersReducer = createReducer(
  initialOrdersState,

  // Whenever user details (with orders) come back, populate orders slice
  on(UserActions.loadUserOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, state)
  )
);
