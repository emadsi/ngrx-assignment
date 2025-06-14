import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'user-total',
  standalone: true,
  imports: [],  // no structural directives used here
  templateUrl: './user-total.component.html',
  styleUrls: ['./user-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTotalComponent {
  @Input() total: number = 0;
}
