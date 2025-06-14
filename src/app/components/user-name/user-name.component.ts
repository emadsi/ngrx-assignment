import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'user-name',
  standalone: true,
  imports: [CommonModule],  // for *ngIf
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNameComponent {
  @Input() userName: string | null = null;
}
