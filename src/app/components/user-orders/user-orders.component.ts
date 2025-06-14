import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserNameComponent } from '../user-name/user-name.component';
import { UserTotalComponent } from '../user-total/user-total.component';
import { selectAllUsersList, selectSelectedUser, selectSelectedUserId, selectUserNameAndTotal } from '../../selectors/user/user.selector';
import * as UserActions from '../../actions/user/user.action'
import { Store } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';
import { User } from '../../models/user/user.interface';
import { AppState } from '../../models/state/state.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'user-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, UserNameComponent, UserTotalComponent],
  templateUrl: './user-orders.component.html',
  styleUrls: ['user-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersComponent {
  userData$: Observable<{ name: string | null; total: number }>;
  users$: Observable<User[]>;
  selectedUser$: Observable<User>;
  selectedUserId$: Observable<number>;

  form = { id: null as number | null, name: '' };
  
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.users$ = this.store.select(selectAllUsersList);
    this.userData$ = this.store.select(selectUserNameAndTotal);
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.selectedUserId$ = this.store.select(selectSelectedUserId);
    this.store.dispatch(UserActions.loadUsers());

    this.selectedUser$
      .pipe(filter(u => u !== undefined))
      .subscribe(user => {
        if (user) {
          this.form = { id: user.id, name: user.name };
        } else {
          this.form = { id: null, name: '' };
        }
    });
  }

  selectUser(id: number) {
    this.store.dispatch(UserActions.setSelectedUserId({ selectedUserId: id }));
  }

  onSubmit() {
    if (this.form.name.trim() === '') {
      return;
    }
    this.selectedUserId$
      .pipe(take(1))
      .subscribe(selectedId => {
        const user: User = { id: this.form.id!, name: this.form.name };
        if (selectedId != null) {
          this.store.dispatch(UserActions.updateUser({ user }));
        } else {
          this.store.dispatch(UserActions.addUser({ user }));
        }
        this.clearForm();
      });
  }

  onDelete() {
    if (this.form.id != null) {
      this.store.dispatch(UserActions.deleteUser({ id: this.form.id }));
      this.clearForm();
    }
  }

  clearForm() {
    this.store.dispatch(UserActions.setSelectedUserId({ selectedUserId: null }));
    this.form = { id: null, name: '' };
  }
}
