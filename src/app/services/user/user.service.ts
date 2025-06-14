import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../models/user/user.interface';
import { MOCK_USERS } from '../../mocks/user/user.mock';
import { MOCK_ORDERS } from '../../mocks/order/order.mock';
import { Order } from '../../models/order/order.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(MOCK_USERS).pipe(delay(500));
  }

  getOrdersByUser(userId: number): Observable<Order[]> {
    const orders = MOCK_ORDERS.filter(o => o.userId === userId);
    return of(orders).pipe(delay(700));
  }
}
