import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user/user.interface';
import { Order } from '../../models/order/order.interface';

const UserActionList = {
  LoadUsers: '[User/API] Load Users',
  LoadUsersSuccess: '[User/API] Load Users Success',
  LoadUserOrders: '[User/API] Load User Orders',
  LoadUserOrdersSuccess: '[User/API] Load User Orders Success',
  addUser: '[User Action] Add User',
  updateUser: '[User Action] Update User',
  deleteUser: '[User Action] Delete User',
  setUserId: '[User Action] Set Selected User ID'
}

export const loadUsers = createAction(UserActionList.LoadUsers);
export const loadUsersSuccess = createAction(UserActionList.LoadUsersSuccess,props<{ users: User[] }>());

export const addUser = createAction(UserActionList.addUser, props<{ user: User }>());
export const updateUser = createAction(UserActionList.updateUser, props<{ user: User }>());
export const deleteUser = createAction(UserActionList.deleteUser, props<{ id: number }>());

export const setSelectedUserId = createAction(UserActionList.setUserId, props<{ selectedUserId: number | null }>());

export const loadUserOrders = createAction(UserActionList.LoadUserOrders, props<{ userId: number }>());
export const loadUserOrdersSuccess = createAction(UserActionList.LoadUserOrdersSuccess, props<{ orders: Order[] }>());
