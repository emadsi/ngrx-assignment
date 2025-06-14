import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Order } from "../order/order.interface";
import { User } from "../user/user.interface";

export interface UsersState extends EntityState<User>{
    selectedUserId: number | null;
}
  
export interface OrdersState extends EntityState<Order> {}
  
export interface AppState {
    users: UsersState;
    orders: OrdersState;
}

export const usersAdapter: EntityAdapter<User>   = createEntityAdapter<User>();
export const ordersAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();