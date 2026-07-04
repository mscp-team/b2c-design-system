import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b2c-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b2c-avatar.component.html',
  styleUrls: ['./b2c-avatar.component.scss'],
})
export class B2cAvatarComponent implements OnChanges {
  @Input() src = '';
  @Input() alt = '';
  @Input() name = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  initials = '';
  bgColor = '';

  private palette = [
    '#00843D','#1565C0','#E65100','#6A1B9A','#C62828','#00838F',
  ];

  ngOnChanges() {
    const parts = this.name.trim().split(' ');
    this.initials = parts.map(p => p[0] ?? '').join('').toUpperCase().slice(0, 2);
    const idx = this.name.charCodeAt(0) % this.palette.length;
    this.bgColor = this.palette[idx] ?? this.palette[0];
  }
}
