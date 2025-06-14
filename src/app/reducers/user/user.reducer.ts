import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../../actions/user/user.action';

import { UsersState, usersAdapter } from '../../models/state/state.interface';

export const initialUsersState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null
});

export const userReducer = createReducer(
  initialUsersState,
  on(UserActions.loadUsersSuccess, (state, { users }) => usersAdapter.setAll(users, state)),
  on(UserActions.addUser, (state, { user })  => usersAdapter.addOne(user, state)),
  on(UserActions.updateUser, (state, { user })  => usersAdapter.upsertOne(user, state)),
  on(UserActions.deleteUser, (state, { id })    => usersAdapter.removeOne(id, state)),
  on(UserActions.setSelectedUserId, (state, { selectedUserId }) => ({
    ...state,
    selectedUserId
  }))
);
