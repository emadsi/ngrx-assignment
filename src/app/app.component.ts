import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
