import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../../actions/user/user.action';
import { switchMap, map, filter } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users }))
        )
      )
    )
  );

  loadUserOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setSelectedUserId),
      filter(({ selectedUserId }) => selectedUserId !== null),
      switchMap(({ selectedUserId }) =>
        this.userService.getOrdersByUser(selectedUserId!).pipe(
          map(orders => UserActions.loadUserOrdersSuccess({ orders }))
        )
      )
    )
  );
}