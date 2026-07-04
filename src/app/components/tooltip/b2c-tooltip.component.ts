import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b2c-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b2c-tooltip.component.html',
  styleUrls: ['./b2c-tooltip.component.scss'],
})
export class B2cTooltipComponent {
  @Input() text = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  show = false;
}
