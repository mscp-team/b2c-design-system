import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b2c-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b2c-card.component.html',
  styleUrls: ['./b2c-card.component.scss'],
})
export class B2cCardComponent {
  @Input() variant: 'elevated' | 'outlined' = 'elevated';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() label = '';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() clickable = false;
  @Output() cardClick = new EventEmitter<void>();
}
