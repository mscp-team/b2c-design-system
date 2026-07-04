import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusType = 'active' | 'inactive' | 'pending' | 'error';

@Component({
  selector: 'b2c-status-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b2c-status-indicator.component.html',
  styleUrls: ['./b2c-status-indicator.component.scss'],
})
export class B2cStatusIndicatorComponent {
  @Input() status: StatusType = 'active';
  @Input() label = '';
  @Input() pill = false;
}
