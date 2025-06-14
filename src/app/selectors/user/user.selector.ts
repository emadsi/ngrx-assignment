import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, UsersState, ordersAdapter, usersAdapter } from '../../models/state/state.interface';
import { AppState } from '../../models/state/state.interface';

// export const selectUserState = createFeatureSelector<AppState, UsersState>('users');
// export const selectOrderState = createFeatureSelector<AppState, OrdersState>('orders');

// const {selectAll: selectAllUsers, selectEntities: selectUserEntities} = usersAdapter.getSelectors(selectUserState);
// const {selectOrdersAll, selectOrdersEntities} = ordersAdapter.getSelectors(selectOrderState);

// export const selectAllUsers = selectUsersAll;

// export const selectUserEntities = selectEntities;

// export const selectSelectedUserId = createSelector(
//   selectUserState,
//   state => state.users.selectedUserId
// );

// export const selectSelectedUser = createSelector(
//   selectUserEntities,
//   selectSelectedUserId,
//   (entities, selectedId) => selectedId ? entities[selectedId] : null
// );

// export const selectSelectedUserOrders = createSelector(
//   selectSelectedUser,
//   user => user ? user.orders : []
// );

// export const selectUserNameAndTotal = createSelector(
//   selectSelectedUser,
//   user => {
//     if (!user) {
//       return { name: null, total: 0 };
//     }
//     const total = user.orders.reduce((sum, o) => sum + o.amount, 0);
//     return { name: user.name, total };
//   }
// );

const selectUsersState  = createFeatureSelector<AppState, UsersState>('users');
const selectOrdersState = createFeatureSelector<AppState, OrdersState>('orders');

const {
  selectAll:   selectAllUsers,
  selectEntities: selectUserEntities
} = usersAdapter.getSelectors(selectUsersState);

const {
  selectAll:      selectAllOrders,
  selectEntities: selectOrderEntities
} = ordersAdapter.getSelectors(selectOrdersState);

export const selectAllUsersList = selectAllUsers;

export const selectSelectedUserId = createSelector(
  selectUsersState,
  state => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, id) => id !== null ? entities[id] : null
);

export const selectOrdersForSelectedUser = createSelector(
  selectAllOrders,
  selectSelectedUserId,
  (orders, id) => id !== null ? orders.filter(o => o.userId === id) : []
);

export const selectUserNameAndTotal = createSelector(
  selectSelectedUser,
  selectOrdersForSelectedUser,
  (user, orders) => {
    if (!user) return { name: null, total: 0 };
    const total = orders.reduce((sum, order) => sum + order.total, 0);
    return { name: user.name, total };
  }
);